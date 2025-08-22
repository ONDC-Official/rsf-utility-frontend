import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import { useToast } from 'context/toastContext'
import { NETWORK_CONFIGURATION } from 'constants/toastMessages'
import DomainConfiguration from 'pages/NetworkConfiguration/DomainConfiguration'
import ProviderBankDetails from 'pages/NetworkConfiguration/ProviderBankDetails'
import CounterpartyInfos from 'pages/NetworkConfiguration/CounterpartyInfos'
import SaveIcon from 'assets/images/svg/SaveIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'
import useDeleteNetworkConfig from 'hooks/mutations/useDeleteNetworkConfig'
import {
  Container,
  MainContainer,
  HeaderSection,
  HeaderTitle,
  StyledForm,
  SaveButtonContainer,
  BulkButton,
} from 'styles/pages/NetworkConfiguration'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { defaultFormData, defaultProvider } from 'pages/NetworkConfiguration/data'
import { useLoader } from 'context/loaderContext'
import DeleteConfirmationModal from 'components/common/DeleteConfirmationModal'
import Loader from 'components/common/Loader'
import { IUser } from 'interfaces/user'

const mapUserToFormData = (user: IUser): IFormData => {
  const shouldSetType = user._id && user.role === 'BPP' && user.msn !== undefined

  // Helper function to normalize applicability values
  const normalizeApplicability = (value: string | undefined): string => {
    if (!value) return ''
    const upperValue = value.toUpperCase()
    // Map old format to new format
    switch (upperValue) {
      case 'NONE':
      case 'ISN':
      case 'MSN':
      case 'BOTH':
        return upperValue
      default:
        return ''
    }
  }

  // Helper function to convert ISO date back to DD/MM/YYYY format
  const formatDateForDisplay = (isoDateString: string | undefined): string => {
    if (!isoDateString) return ''
    try {
      const date = new Date(isoDateString)
      if (isNaN(date.getTime())) return ''

      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()

      return `${day}/${month}/${year}`
    } catch {
      return ''
    }
  }

  return {
    _id: user?._id,
    title: user.title || '',
    role: user.role === 'BPP' ? 'Seller App' : user.role === 'BAP' ? 'Buyer App' : '',
    subscriberUrl: user.subscriber_url || '',
    domainCategory: user.domain?.toUpperCase() || '',
    buyerNpToNpTcs: user.np_tcs || 0,
    buyerNpToNpTds: user.np_tds || 0,
    sellerNpToTcs: user.pr_tcs || 0,
    sellerNpToTds: user.pr_tds || 0,
    sellerNpToProviderTcs: user.pr_provider_tcs || 0,
    sellerNpToProviderTds: user.pr_provider_tds || 0,
    selectedType: shouldSetType ? (user.msn ? 'MSN' : 'ISN') : '',
    tcs_applicability: normalizeApplicability(user.tcs_applicability),
    tds_applicability: normalizeApplicability(user.tds_applicability),
    counterparty_infos: user.counterparty_infos || [],
    providers: user.provider_details?.length
      ? user.provider_details.map((p) => ({
          providerId: p.provider_id || '',
          accountNumber: p.account_number || '',
          ifscCode: p.ifsc_code || '',
          bankName: p.bank_name || '',
          providerName: p.provider_name || '',
        }))
      : [defaultProvider],
    effectiveDate1: formatDateForDisplay(user.np_tcs_with_effective_date),
    effectiveDate2: formatDateForDisplay(user.np_tds_with_effective_date),
    effectiveDate3: formatDateForDisplay(user.np_tcs_with_effective_date),
    effectiveDate4: formatDateForDisplay(user.np_tds_with_effective_date),
    effectiveDate5: formatDateForDisplay(user.pr_tcs_with_effective_date),
    effectiveDate6: formatDateForDisplay(user.pr_tds_with_effective_date),
  }
}

const NetworkConfiguration: FC = () => {
  const toast = useToast()
  const { showLoader, hideLoader } = useLoader()
  const { selectedUser, isLoading, setSelectedUser, refetch, users } = useUserContext()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormData>({ mode: 'onChange', defaultValues: defaultFormData })

  const { role, selectedType, _id, counterparty_infos } = watch()
  const isEditing = !!_id

  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()
  const { triggerAsync: deleteConfig, isLoading: isDeleteLoading } = useDeleteNetworkConfig()

  useEffect(() => {
    if (selectedUser) {
      const mappedData = mapUserToFormData(selectedUser)
      reset(mappedData)
    } else {
      reset(defaultFormData)
    }
  }, [selectedUser, reset])

  const onSubmit = async (data: IFormData): Promise<void> => {
    showLoader()

    const cleanedProviders =
      data.role === 'Buyer App'
        ? undefined
        : data.providers?.filter((p) =>
            [p.providerId, p.accountNumber, p.ifscCode, p.bankName, p.providerName].some(
              (v) => !!(v && String(v).trim()),
            ),
          )

    const payload = {
      ...data,
      providers: cleanedProviders,
      counterparty_infos: data.counterparty_infos || [],
    }

    try {
      const res = await submitConfig(payload)

      if (res?.data?._id) {
        setSelectedUser(res.data)
      }

      await refetch()

      if (res.success) {
        toast({
          message: `User ${res.data.title ? 'updated' : 'created'} successfully.`,
          severity: NETWORK_CONFIGURATION.SUCCESS.severity,
        })
      }
    } catch (err) {
      console.error('Network configuration submission failed:', err)
      toast({
        message: NETWORK_CONFIGURATION.ERROR.message,
        severity: NETWORK_CONFIGURATION.ERROR.severity,
      })
    } finally {
      hideLoader()
    }
  }

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!_id) return

    setDeleteModalOpen(false)
    showLoader()

    try {
      await deleteConfig(_id)

      if (users?.length) {
        const remainingUsers = users.filter((u) => u._id !== _id)
        const lastUser = remainingUsers.length > 0 ? remainingUsers[remainingUsers.length - 1] : null
        setSelectedUser(lastUser)
        reset(lastUser ? mapUserToFormData(lastUser) : defaultFormData)
      }

      toast({
        message: 'User deleted successfully.',
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch (err) {
      console.error('Failed to delete user:', err)
      toast({
        message: 'Failed to delete user. Please try again.',
        severity: NETWORK_CONFIGURATION.ERROR.severity,
      })
    } finally {
      hideLoader()
    }
  }

  if (isLoading) return <Loader open />

  return (
    <Container>
      <MainContainer>
        <HeaderSection>
          <HeaderTitle>Settlement Configuration</HeaderTitle>
          <BulkButton variant="outlined" onClick={() => reset(defaultFormData)} aria-label="Add configuration">
            <AddIcon /> Add Configuration
          </BulkButton>
        </HeaderSection>

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <DomainConfiguration
            errors={errors}
            role={role}
            type={selectedType}
            isEditing={isEditing}
            control={control}
            selectedUser={selectedUser}
          />
        </StyledForm>

        <DeleteConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Deletion"
          message="Are you sure you want to delete this configuration? This action cannot be undone."
          isLoading={isDeleteLoading}
        />
      </MainContainer>

      {isEditing && counterparty_infos && counterparty_infos.length > 0 && (
        <CounterpartyInfos control={control} errors={errors} isEditing={isEditing} />
      )}

      {role === 'Seller App' && selectedType === 'MSN' && <ProviderBankDetails control={control} errors={errors} />}

      <SaveButtonContainer>
        <BulkButton variant="contained" onClick={handleSubmit(onSubmit)} disabled={isSubmitLoading}>
          <SaveIcon /> {isSubmitLoading ? 'Submitting...' : isEditing ? 'Update' : 'Save & Proceed'}
        </BulkButton>

        {selectedUser?._id && (
          <BulkButton
            variant="outlined"
            color="error"
            onClick={() => setDeleteModalOpen(true)}
            disabled={isDeleteLoading}
          >
            Delete
          </BulkButton>
        )}
      </SaveButtonContainer>
    </Container>
  )
}

export default NetworkConfiguration
