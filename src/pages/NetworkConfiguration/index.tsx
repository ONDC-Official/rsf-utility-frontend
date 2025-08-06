import TextField from '@mui/material/TextField'
import { MenuItem, Select, FormHelperText } from '@mui/material'
import TaxesIcon from 'assets/images/svg/TaxesIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import SaveIcon from 'assets/images/svg/SaveIcon'
import UploadIcon from 'assets/images/svg/UploadIcon'
import {
  Container,
  SectionTitle,
  SectionDescription,
  HeaderSection,
  HeaderCard,
  ActionButton,
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  ConfigTitleSection,
  FormContainer,
  ButtonGroup,
  BulkButton,
  SaveButtonContainer,
  StyledForm,
} from 'styles/pages/NetworkConfiguration'
import { TypographyVariant } from 'enums/typography'
import { useForm, useFieldArray } from 'react-hook-form'
import { useUserContext } from 'context/userContext'
import { useEffect } from 'react'
import useSubmitNetworkConfig from 'hooks/mutations/useSubmitNetworkConfig'

interface Provider {
  providerId: string
  ifscCode: string
  accountNumber: string
  bankName: string
}

interface FormData {
  title: string
  role: string
  domainCategory: string
  npToProviderTax: number
  type: string
  npToNpTax: number
  subscriberUrl: string
  providers: Provider[]
}

const defaultProvider: Provider = {
  providerId: '',
  ifscCode: '',
  accountNumber: '',
  bankName: '',
}

const defaultFormData: FormData = {
  title: '',
  role: '',
  domainCategory: '',
  npToProviderTax: 0,
  type: '',
  npToNpTax: 0,
  subscriberUrl: '',
  providers: [defaultProvider],
}

const NetworkConfiguration = () => {
  const { selectedUser, isLoading: isUserLoading, setSelectedUser } = useUserContext()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' })

  const { fields, append, remove } = useFieldArray({ control, name: 'providers' })
  const { triggerAsync: submitConfig, isLoading: isSubmitLoading } = useSubmitNetworkConfig()

  const role = watch('role')

  const onSubmit = async (data: FormData) => {
    try {
      const response = await submitConfig(data)
      reset(defaultFormData)
      setSelectedUser(null)
      const action = selectedUser?._id ? 'updated' : 'created'
      console.log(`User ${action} successfully:`, response)
    } catch (error) {
      reset(defaultFormData)
      setSelectedUser(null)
      console.error('Submission failed:', error)
    }
  }

  useEffect(() => {
    const mappedProviders = selectedUser?.provider_details?.map((provider) => ({
      providerId: provider.provider_id || '',
      accountNumber: provider.account_number || '',
      ifscCode: provider.ifsc_code || '',
      bankName: provider.bank_name || '',
    })) || [defaultProvider]

    setValue('role', selectedUser?.role === 'BPP' ? 'Seller App' : selectedUser?.role === 'BAP' ? 'Buyer App' : '')
    setValue('subscriberUrl', selectedUser?.subscriber_url || '')
    setValue('domainCategory', selectedUser?.domain?.toUpperCase() || '')
    setValue('npToProviderTax', selectedUser?.tds || 0)
    setValue('npToNpTax', selectedUser?.tcs || 0)
    setValue('type', selectedUser?.msn ? 'MSN' : '')
    setValue('providers', mappedProviders)
  }, [selectedUser, setValue])

  if (isUserLoading) return <div>Loading...</div>

  return (
    <Container>
      <HeaderSection>
        <HeaderCard>
          <SectionTitle variant={TypographyVariant.H3Semibold}>Network Configuration</SectionTitle>
          <SectionDescription>Configure your ONDC network parameters and settlement details</SectionDescription>
        </HeaderCard>
        <ActionButton
          variant="outlined"
          onClick={() => {
            setSelectedUser(null)
            reset(defaultFormData)
          }}
        >
          <AddIcon /> Add Configuration
        </ActionButton>
      </HeaderSection>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/* Domain and Tax Configuration */}
        <ConfigurationBox>
          <SettlementHeader>
            <NetworkIdentityHeader>
              <TaxesIcon />
              <NetworkIdentityTitle>Settlement Configuration</NetworkIdentityTitle>
            </NetworkIdentityHeader>
          </SettlementHeader>
          <DomainConfigContainer>
            <ConfigHeader>
              <div>Domain Configuration</div>
            </ConfigHeader>
            <ConfigTitleSection>
              <div>Title of a Configuration</div>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter title of a configuration"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </ConfigTitleSection>

            <FormContainer>
              <div>Role</div>
              <Select
                {...register('role', { required: 'Role is required' })}
                value={role || ''}
                error={!!errors.role}
                onChange={(e) => setValue('role', e.target.value, { shouldValidate: true })}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Seller App">Seller App</MenuItem>
                <MenuItem value="Buyer App">Buyer App</MenuItem>
              </Select>
              {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}

              <div>Domain Category</div>
              <Select
                {...register('domainCategory', { required: 'Domain category is required' })}
                value={watch('domainCategory') || ''}
                error={!!errors.domainCategory}
                onChange={(e) => setValue('domainCategory', e.target.value, { shouldValidate: true })}
              >
                <MenuItem value="">Select Domain Category</MenuItem>
                <MenuItem value="F&B (RET11)">F&B (RET11)</MenuItem>
              </Select>
              {errors.domainCategory && <FormHelperText error>{errors.domainCategory.message}</FormHelperText>}

              <div>NP to NP Tax (%)</div>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                {...register('npToNpTax', {
                  required: 'NP to NP Tax is required',
                  min: { value: 0, message: 'Tax cannot be negative' },
                  max: { value: 100, message: 'Tax cannot exceed 100%' },
                })}
                error={!!errors.npToNpTax}
                helperText={errors.npToNpTax?.message}
              />

              <div>NP-to-Provider Tax</div>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                {...register('npToProviderTax', {
                  required: 'NP-to-Provider Tax is required',
                  min: { value: 0, message: 'Tax cannot be negative' },
                  max: { value: 100, message: 'Tax cannot exceed 100%' },
                })}
                error={!!errors.npToProviderTax}
                helperText={errors.npToProviderTax?.message}
              />
            </FormContainer>

            {role !== 'Buyer App' && (
              <FormContainer>
                <div>Type</div>
                <Select
                  {...register('type', { required: 'Type is required' })}
                  value={watch('type') || ''}
                  error={!!errors.type}
                  onChange={(e) => setValue('type', e.target.value, { shouldValidate: true })}
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="MSN">MSN</MenuItem>
                </Select>
                {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}

                <div>Subscriber URL</div>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register('subscriberUrl', {
                    required: 'Subscriber URL is required',
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                      message: 'Enter a valid URL',
                    },
                  })}
                  error={!!errors.subscriberUrl}
                  helperText={errors.subscriberUrl?.message}
                />
              </FormContainer>
            )}
          </DomainConfigContainer>
        </ConfigurationBox>

        {/* Provider Details */}
        <ConfigurationBox>
          <SettlementHeader>
            <NetworkIdentityHeader>
              <BankIcon />
              <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
            </NetworkIdentityHeader>
            <ButtonGroup>
              <ActionButton variant="outlined" onClick={() => append(defaultProvider)}>
                <AddIcon /> Add Provider
              </ActionButton>
              <BulkButton variant="contained">
                <UploadIcon /> Bulk upload
              </BulkButton>
            </ButtonGroup>
          </SettlementHeader>

          {fields.map((field, index) => (
            <DomainConfigContainer key={field.id}>
              <ConfigHeader>
                <div>Provider {index + 1}</div>
                {fields.length > 1 && <RemoveIcon onClick={() => remove(index)} />}
              </ConfigHeader>

              <FormContainer>
                <div>Provider ID</div>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register(`providers.${index}.providerId`, {
                    required: 'Provider ID is required',
                    pattern: { value: /^[A-Z0-9]+$/, message: 'Provider ID must be alphanumeric' },
                  })}
                  error={!!errors.providers?.[index]?.providerId}
                  helperText={errors.providers?.[index]?.providerId?.message}
                />

                <div>IFSC Code</div>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register(`providers.${index}.ifscCode`, {
                    required: 'IFSC Code is required',
                    pattern: {
                      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                      message: 'Enter a valid IFSC code (e.g., ICIC0001234)',
                    },
                  })}
                  error={!!errors.providers?.[index]?.ifscCode}
                  helperText={errors.providers?.[index]?.ifscCode?.message}
                />
              </FormContainer>

              <FormContainer>
                <div>Account Number</div>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register(`providers.${index}.accountNumber`, {
                    required: 'Account number is required',
                    pattern: { value: /^\d{9,18}$/, message: 'Account number must be between 9 and 18 digits' },
                  })}
                  error={!!errors.providers?.[index]?.accountNumber}
                  helperText={errors.providers?.[index]?.accountNumber?.message}
                />

                <div>Bank Name</div>
                <TextField
                  fullWidth
                  variant="outlined"
                  {...register(`providers.${index}.bankName`, {
                    required: 'Bank name is required',
                    minLength: { value: 3, message: 'Bank name must be at least 3 characters long' },
                  })}
                  error={!!errors.providers?.[index]?.bankName}
                  helperText={errors.providers?.[index]?.bankName?.message}
                />
              </FormContainer>
            </DomainConfigContainer>
          ))}
        </ConfigurationBox>

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
