import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import { useToast } from 'context/toastContext'
import { NETWORK_CONFIGURATION } from 'constants/toastMessages'
import HeaderSection from './HeaderSection'
import DomainConfiguration from './DomainConfiguration'
import ProviderBankDetails from './ProviderBankDetails'
import SaveIcon from 'assets/images/svg/SaveIcon'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'
import { Container, StyledForm, SaveButtonContainer, BulkButton } from 'styles/pages/NetworkConfiguration'
import { IFormData } from 'pages/NetworkConfiguration/type'
import { defaultFormData, defaultProvider } from 'pages/NetworkConfiguration/data'

const NetworkConfiguration = () => {
  const { selectedUser, isLoading, setSelectedUser, refetch } = useUserContext()
  const toast = useToast()
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ mode: 'onBlur', defaultValues: defaultFormData })
  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()
  const role = watch('role')

  useEffect(() => {
    if (selectedUser) {
      setValue('role', selectedUser?.role === 'BPP' ? 'Seller App' : selectedUser?.role === 'BAP' ? 'Buyer App' : '')
      setValue('subscriberUrl', selectedUser?.subscriber_url || '')
      setValue('domainCategory', selectedUser?.domain?.toUpperCase() || '')
      setValue('npToProviderTax', selectedUser?.tds || 0)
      setValue('npToNpTax', selectedUser?.tcs || 0)
      setValue('type', selectedUser?.msn ? 'MSN' : '')
      setValue(
        'providers',
        selectedUser?.provider_details?.length
          ? selectedUser?.provider_details?.map((p) => ({
              providerId: p?.provider_id || '',
              accountNumber: p.account_number || '',
              ifscCode: p?.ifsc_code || '',
              bankName: p?.bank_name || '',
            }))
          : [defaultFormData.providers?.[0] ?? defaultProvider],
      )
    } else {
      setValue('providers', defaultFormData.providers)
    }
  }, [selectedUser, setValue])

  const onSubmit = async (data: IFormData) => {
    // If user comes first (no selectedUser) and role is undefined or empty, exclude providers
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
      setSelectedUser(null)
      toast({
        message: `User ${selectedUser?._id ? 'updated' : 'created'} successfully.`,
        severity: NETWORK_CONFIGURATION.SUCCESS.severity,
      })
    } catch {
      reset(defaultFormData)
      setSelectedUser(null)
      toast(NETWORK_CONFIGURATION.ERROR)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <Container>
      <HeaderSection reset={reset} setSelectedUser={setSelectedUser} />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <DomainConfiguration register={register} errors={errors} role={role} setValue={setValue} watch={watch} />
        {/* Show ProviderBankDetails only if role is defined and not empty when no selectedUser, or if role is not 'Buyer App' */}
        {(!selectedUser && (!role || role === '') ? false : role !== 'Buyer App') && (
          <ProviderBankDetails control={control} errors={errors} />
        )}
        <SaveButtonContainer>
          <BulkButton variant="contained" type="submit" disabled={isSubmitLoading}>
            <SaveIcon /> {isSubmitLoading ? 'Submitting...' : selectedUser?._id ? 'Update' : 'Save & Proceed'}
          </BulkButton>
        </SaveButtonContainer>
      </StyledForm>
    </Container>
  )
}

export default NetworkConfiguration
