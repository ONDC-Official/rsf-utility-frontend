import { useEffect, FC } from 'react'
import { useForm } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import { useToast } from 'context/toastContext'
import { NETWORK_CONFIGURATION } from 'constants/toastMessages'
import HeaderSection from './HeaderSection'
import DomainConfiguration from './DomainConfiguration'
import ProviderBankDetails from './ProviderBankDetails'
import SaveIcon from 'assets/images/svg/SaveIcon'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'
import useDeleteNetworkConfig from 'hooks/mutations/useDeleteNetworkConfig'
import { Container, StyledForm, SaveButtonContainer, BulkButton } from 'styles/pages/NetworkConfiguration'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { defaultFormData, defaultProvider } from 'pages/NetworkConfiguration/data'
import { useLoader } from 'context/loaderContext'

const NetworkConfiguration: FC = () => {
  const { selectedUser, isLoading, setSelectedUser, refetch, users } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const toast = useToast()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ mode: 'onBlur', defaultValues: defaultFormData })
  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()
  const { triggerAsync: deleteConfig, isLoading: isDeleteLoading } = useDeleteNetworkConfig()
  const { role, type } = watch()

  const onSubmit = async (data: IFormData): Promise<void> => {
    showLoader()
    const payload =
      !selectedUser && (!data.role || data.role === '')
        ? { ...data, providers: undefined }
        : data.role === 'Buyer App'
        ? { ...data, providers: undefined }
        : data

    try {
      await submitConfig(payload)
      refetch()
      reset(defaultFormData)
      setSelectedUser(!!users && users?.length > 0 ? users[0] : null)
      toast({
        message: `User ${selectedUser?._id ? 'updated' : 'created'} successfully.`,
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch {
      hideLoader()
      reset(defaultFormData)
      setSelectedUser(null)
      toast(NETWORK_CONFIGURATION.ERROR)
    } finally {
      hideLoader()
    }
  }

  const handleDelete = async (): Promise<void> => {
    if (!selectedUser?._id) return

    showLoader()
    try {
      await deleteConfig(selectedUser._id)
      refetch()
      reset(defaultFormData)
      setSelectedUser(null)
      toast({
        message: 'User deleted successfully.',
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch {
      hideLoader()
      toast(NETWORK_CONFIGURATION.ERROR)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (selectedUser) {
      setValue('title', selectedUser?.title || '')
      setValue('role', selectedUser?.role === 'BPP' ? 'Seller App' : selectedUser?.role === 'BAP' ? 'Buyer App' : '')
      setValue('subscriberUrl', selectedUser?.subscriber_url || '')
      setValue('domainCategory', selectedUser?.domain?.toUpperCase() || '')
      setValue('buyerNpToNpTcs', selectedUser?.np_tcs || 0)
      setValue('buyerNpToNpTds', selectedUser?.np_tds || 0)
      setValue('sellerNpToTcs', selectedUser?.pr_tcs || 0)
      setValue('sellerNpToTds', selectedUser?.pr_tds || 0)
      setValue('sellerNpToProviderTcs', selectedUser?.pr_provider_tcs || 0)
      setValue('sellerNpToProviderTds', selectedUser?.pr_provider_tds || 0)
      setValue('type', selectedUser?.msn ? 'MSN' : '')
      setValue(
        'providers',
        selectedUser?.provider_details?.length
          ? selectedUser?.provider_details?.map((p) => ({
              providerId: p?.provider_id || '',
              accountNumber: p.account_number || '',
              ifscCode: p?.ifsc_code || '',
              bankName: p?.bank_name || '',
              providerName: p?.provider_name || '',
            }))
          : [defaultFormData.providers?.[0] ?? defaultProvider],
      )
    } else {
      setValue('providers', defaultFormData.providers)
    }
  }, [selectedUser, setValue])

  useEffect(() => {
    if (role && !selectedUser) {
      setValue('role', role)
      setValue('buyerNpToNpTcs', 0)
      setValue('buyerNpToNpTds', 0)
      setValue('sellerNpToTcs', 0)
      setValue('sellerNpToTds', 0)
      setValue('sellerNpToProviderTcs', 0)
      setValue('sellerNpToProviderTds', 0)
      setValue('type', '')
      setValue('subscriberUrl', '')
      setValue('providers', [defaultProvider])
    }
  }, [role, setValue])

  if (isLoading) return <div>Loading...</div>

  return (
    <Container>
      <HeaderSection reset={reset} setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <DomainConfiguration errors={errors} role={role} type={type} selectedUser={selectedUser} control={control} />
        {role === 'Seller App' && type === 'MSN' && <ProviderBankDetails control={control} errors={errors} />}
        {/* {(!selectedUser && (!role || role === '') && !type ? false : role !== 'Buyer App') && (
          <ProviderBankDetails control={control} errors={errors} />
        )} */}
        <SaveButtonContainer>
          <BulkButton variant="contained" type="submit" disabled={isSubmitLoading}>
            <SaveIcon /> {isSubmitLoading ? 'Submitting...' : selectedUser?._id ? 'Update' : 'Save & Proceed'}
          </BulkButton>
          {selectedUser?._id && (
            <BulkButton
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={isDeleteLoading}
              style={{ marginLeft: '12px' }}
            >
              Delete
            </BulkButton>
          )}
        </SaveButtonContainer>
      </StyledForm>
    </Container>
  )
}

export default NetworkConfiguration
