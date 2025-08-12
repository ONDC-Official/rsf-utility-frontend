import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import { useToast } from 'context/toastContext'
import { NETWORK_CONFIGURATION } from 'constants/toastMessages'
import DomainConfiguration from './DomainConfiguration'
import ProviderBankDetails from './ProviderBankDetails'
import SaveIcon from 'assets/images/svg/SaveIcon'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'
import useDeleteNetworkConfig from 'hooks/mutations/useDeleteNetworkConfig'
import { Container, StyledForm, SaveButtonContainer, BulkButton } from 'styles/pages/NetworkConfiguration'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { defaultFormData, defaultProvider } from 'pages/NetworkConfiguration/data'
import { useLoader } from 'context/loaderContext'
import DeleteConfirmationModal from 'components/common/DeleteConfirmationModal'
import Loader from 'components/common/Loader'
import { IUser } from '@interfaces/user'
import AddIcon from 'assets/images/svg/AddIcon'
import {
  HeaderSection as HeaderSectionStyled,
  HeaderCard,
  SectionTitle,
  ActionButton,
} from 'styles/pages/NetworkConfiguration'

const mapUserToFormData = (user: IUser): IFormData => ({
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
  type: user.msn ? 'MSN' : 'ISN',
  tcs_applicability: user.tcs_applicability || '',
  tds_applicability: user.tds_applicability || '',
  providers: user.provider_details?.length
    ? user.provider_details.map((p) => ({
        providerId: p.provider_id || '',
        accountNumber: p.account_number || '',
        ifscCode: p.ifsc_code || '',
        bankName: p.bank_name || '',
        providerName: p.provider_name || '',
      }))
    : [defaultProvider],
})

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
  } = useForm<IFormData>({ mode: 'onBlur', defaultValues: defaultFormData })

  const { role, type, _id } = watch()
  const isEditing = !!_id

  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()
  const { triggerAsync: deleteConfig, isLoading: isDeleteLoading } = useDeleteNetworkConfig()

  useEffect(() => {
    if (selectedUser) {
      reset(mapUserToFormData(selectedUser))
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

    const payload = { ...data, providers: cleanedProviders }

    try {
      const configuration = await submitConfig(payload)

      if (configuration?.data?._id) {
        setSelectedUser(configuration.data)
      }

      await refetch()
      toast({
        message: `User ${configuration.data.title ? 'updated' : 'created'} successfully.`,
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch (err) {
      toast(NETWORK_CONFIGURATION.ERROR)
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
        reset(lastUser || defaultFormData)
      }

      toast({
        message: 'User deleted successfully.',
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch {
      toast(NETWORK_CONFIGURATION.ERROR)
    } finally {
      hideLoader()
    }
  }

  if (isLoading) return <Loader open />

  return (
    <Container>
      <HeaderSectionStyled>
        <HeaderCard>
          <SectionTitle>Configuration</SectionTitle>
        </HeaderCard>

        <ActionButton variant="outlined" onClick={reset} aria-label="Add configuration">
          <AddIcon /> Add Configuration
        </ActionButton>
      </HeaderSectionStyled>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <DomainConfiguration errors={errors} role={role} type={type} isEditing={isEditing} control={control} />

        {role === 'Seller App' && type === 'MSN' && <ProviderBankDetails control={control} errors={errors} />}

        <SaveButtonContainer>
          <BulkButton variant="contained" type="submit" disabled={isSubmitLoading}>
            <SaveIcon /> {isSubmitLoading ? 'Submitting...' : isEditing ? 'Update' : 'Save & Proceed'}
          </BulkButton>

          {selectedUser?._id && (
            <BulkButton
              variant="outlined"
              color="error"
              onClick={() => setDeleteModalOpen(true)}
              disabled={isDeleteLoading}
              style={{ marginLeft: 12 }}
            >
              Delete
            </BulkButton>
          )}
        </SaveButtonContainer>
      </StyledForm>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this configuration? This action cannot be undone."
        isLoading={isDeleteLoading}
      />
    </Container>
  )
}

export default NetworkConfiguration
