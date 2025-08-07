import { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { MenuItem, Select, FormHelperText } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import SaveIcon from 'assets/images/svg/SaveIcon'
import {
  Container,
  SectionTitle,
  HeaderSection,
  HeaderCard,
  ActionButton,
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  FormContainer,
  SaveButtonContainer,
  StyledForm,
  BulkButton,
} from 'styles/pages/NetworkConfiguration'
import { useForm, useFieldArray } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'
import { useToast } from 'context/toastContext'
import { NETWORK_CONFIGURATION } from 'constants/toastMessages'
import { IFormData } from './type'
import { defaultFormData, defaultProvider } from './data'

const NetworkConfiguration = () => {
  const { selectedUser, isLoading, setSelectedUser } = useUserContext()
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
  const { fields, append, remove } = useFieldArray({ control, name: 'providers' })
  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()
  const role = watch('role')

  useEffect(() => {
    if (selectedUser) {
      setValue('role', selectedUser.role === 'BPP' ? 'Seller App' : selectedUser.role === 'BAP' ? 'Buyer App' : '')
      setValue('subscriberUrl', selectedUser.subscriber_url || '')
      setValue('domainCategory', selectedUser.domain?.toUpperCase() || '')
      setValue('npToProviderTax', selectedUser.tds || 0)
      setValue('npToNpTax', selectedUser.tcs || 0)
      setValue('type', selectedUser.msn ? 'MSN' : '')
      setValue(
        'providers',
        selectedUser.provider_details?.length
          ? selectedUser.provider_details.map((p) => ({
              providerId: p.provider_id || '',
              accountNumber: p.account_number || '',
              ifscCode: p.ifsc_code || '',
              bankName: p.bank_name || '',
            }))
          : [defaultProvider],
      )
    } else {
      setValue('providers', fields.length ? fields : [defaultProvider])
    }
  }, [selectedUser, setValue])

  const onSubmit = async (data: IFormData) => {
    const { providers, ...rest } = data
    const payload = data.role === 'Buyer App' ? rest : data
    try {
      await submitConfig(payload)
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
      <HeaderSection>
        <HeaderCard>
          <SectionTitle>Network Configuration</SectionTitle>
        </HeaderCard>
        <ActionButton
          variant="outlined"
          onClick={() => {
            reset(defaultFormData)
            setSelectedUser(null)
          }}
        >
          <AddIcon /> Add Configuration
        </ActionButton>
      </HeaderSection>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <ConfigurationBox>
          <SettlementHeader>
            <NetworkIdentityHeader>
              <TaxesIcon />
              <NetworkIdentityTitle>Settlement Configuration</NetworkIdentityTitle>
            </NetworkIdentityHeader>
          </SettlementHeader>
          <DomainConfigContainer>
            <ConfigHeader>Domain Configuration</ConfigHeader>
            <FormContainer>
              <TextField
                fullWidth
                placeholder="Enter Configuration Title"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
              <Select
                {...register('role', { required: 'Role is required' })}
                value={role || ''}
                error={!!errors.role}
                displayEmpty
                renderValue={(selected) => (selected ? selected : 'Select Role')}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                <MenuItem value="Seller App">Seller App</MenuItem>
                <MenuItem value="Buyer App">Buyer App</MenuItem>
              </Select>
              {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}

              <Select
                {...register('domainCategory', { required: 'Domain category is required' })}
                value={watch('domainCategory') || ''}
                error={!!errors.domainCategory}
                displayEmpty
                renderValue={(selected) => (selected ? selected : 'Select Domain Category')}
              >
                <MenuItem value="" disabled>
                  Select Domain Category
                </MenuItem>
                <MenuItem value="F&B (RET11)">F&B (RET11)</MenuItem>
              </Select>
              {errors.domainCategory && <FormHelperText error>{errors.domainCategory.message}</FormHelperText>}

              <TextField
                fullWidth
                type="number"
                placeholder="Enter NP to NP Tax (%)"
                {...register('npToNpTax', { required: 'Tax is required', min: 0, max: 100 })}
                error={!!errors.npToNpTax}
                helperText={errors.npToNpTax?.message}
              />
              <TextField
                fullWidth
                type="number"
                placeholder="Enter NP to Provider Tax (%)"
                {...register('npToProviderTax', { required: 'Tax is required', min: 0, max: 100 })}
                error={!!errors.npToProviderTax}
                helperText={errors.npToProviderTax?.message}
              />
              {role !== 'Buyer App' && (
                <>
                  <Select
                    {...register('type', { required: 'Type is required' })}
                    value={watch('type') || ''}
                    error={!!errors.type}
                    displayEmpty
                    renderValue={(selected) => (selected ? selected : 'Select Type')}
                  >
                    <MenuItem value="" disabled>
                      Select Type
                    </MenuItem>
                    <MenuItem value="MSN">MSN</MenuItem>
                  </Select>
                  {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
                  <TextField
                    fullWidth
                    placeholder="Enter Subscriber URL"
                    {...register('subscriberUrl', {
                      required: 'URL is required',
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
                        message: 'Invalid URL',
                      },
                    })}
                    error={!!errors.subscriberUrl}
                    helperText={errors.subscriberUrl?.message}
                  />
                </>
              )}
            </FormContainer>
          </DomainConfigContainer>
        </ConfigurationBox>

        {role !== 'Buyer App' && (
          <ConfigurationBox>
            <SettlementHeader>
              <NetworkIdentityHeader>
                <BankIcon />
                <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
              </NetworkIdentityHeader>
              <ActionButton variant="outlined" onClick={() => append(defaultProvider)}>
                <AddIcon /> Add Provider
              </ActionButton>
            </SettlementHeader>

            {fields.map((field, index) => (
              <DomainConfigContainer key={field.id}>
                <ConfigHeader>
                  <div>Provider {index + 1}</div>
                  {fields.length > 1 && <RemoveIcon onClick={() => remove(index)} />}
                </ConfigHeader>
                <FormContainer>
                  <TextField
                    fullWidth
                    placeholder="Enter Provider ID"
                    {...register(`providers.${index}.providerId`, {
                      required: 'Provider ID is required',
                      pattern: { value: /^[A-Z0-9]+$/, message: 'Must be alphanumeric' },
                    })}
                    error={!!errors.providers?.[index]?.providerId}
                    helperText={errors.providers?.[index]?.providerId?.message}
                  />
                  <TextField
                    fullWidth
                    placeholder="Enter IFSC Code"
                    {...register(`providers.${index}.ifscCode`, {
                      required: 'IFSC Code is required',
                      pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code' },
                    })}
                    error={!!errors.providers?.[index]?.ifscCode}
                    helperText={errors.providers?.[index]?.ifscCode?.message}
                  />
                  <TextField
                    fullWidth
                    placeholder="Enter Account Number"
                    {...register(`providers.${index}.accountNumber`, {
                      required: 'Account number is required',
                      pattern: { value: /^\d{9,18}$/, message: 'Must be 9-18 digits' },
                    })}
                    error={!!errors.providers?.[index]?.accountNumber}
                    helperText={errors.providers?.[index]?.accountNumber?.message}
                  />
                  <TextField
                    fullWidth
                    placeholder="Enter Bank Name"
                    {...register(`providers.${index}.bankName`, {
                      required: 'Bank name is required',
                      minLength: { value: 3, message: 'Minimum 3 characters' },
                    })}
                    error={!!errors.providers?.[index]?.bankName}
                    helperText={errors.providers?.[index]?.bankName?.message}
                  />
                </FormContainer>
              </DomainConfigContainer>
            ))}
          </ConfigurationBox>
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
