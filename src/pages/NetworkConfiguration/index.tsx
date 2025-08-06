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
} from 'styles/pages/NetworkConfiguration'
import { TypographyVariant } from 'enums/typography'
import { useForm, useFieldArray } from 'react-hook-form'
import usePost from 'hooks/usePost'

const NetworkConfiguration = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      role: '',
      domainCategory: '',
      npToProviderTax: 0.0,
      type: '',
      npToNpTax: 0.0,
      subscriberUrl: '',
      providers: [
        {
          providerId: '',
          ifscCode: '',
          accountNumber: '',
          bankName: '',
        },
      ],
    },
    mode: 'onChange',
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'providers',
  })

  const { mutateAsync, isLoading } = usePost()

  const role = watch('role')

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        role: data.role === 'Seller App' ? 'BPP' : 'BAP',
        subscriber_url: data.subscriberUrl,
        domain: data.domainCategory.toLowerCase().replace(/[^a-z0-9]/g, ''),
        tcs: parseFloat(data.npToNpTax),
        tds: parseFloat(data.npToProviderTax),
        msn: data.type === 'MSN',
        provider_details: data.providers.map((provider: any) => ({
          provider_id: provider.providerId,
          account_number: provider.accountNumber,
          ifsc_code: provider.ifscCode,
          bank_name: provider.bankName,
        })),
      }

      const res = await mutateAsync({
        url: 'https://fis-staging.ondc.org/rsf-utility/ui/users',
        payload,
      })

      // Optional: handle response success
      console.log('Submission successful:', res)
    } catch (error) {
      // Optional: handle error properly
      console.error('Submission failed:', error)
    }
  }

  return (
    <Container>
      <HeaderSection>
        <HeaderCard>
          <SectionTitle variant={TypographyVariant.H3Semibold}>Network Configuration</SectionTitle>
          <SectionDescription>Configure your ONDC network parameters and settlement details</SectionDescription>
        </HeaderCard>
        <ActionButton variant="outlined">
          <AddIcon />
          Add Configuration
        </ActionButton>
      </HeaderSection>

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
              {...register('title', {
                required: 'Configuration title is required',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters long',
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </ConfigTitleSection>
          <FormContainer>
            <div>Role</div>
            <Select {...register('role', { required: 'Role is required' })} error={!!errors.role}>
              <MenuItem value="Seller App">Seller App</MenuItem>
              <MenuItem value="Buyer App">Buyer App</MenuItem>
            </Select>
            {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}

            <div>Domain Category</div>
            <Select
              {...register('domainCategory', { required: 'Domain category is required' })}
              error={!!errors.domainCategory}
            >
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
              <Select {...register('type', { required: 'Type is required' })} error={!!errors.type}>
                <MenuItem value="MSN">MSN</MenuItem>
              </Select>
              {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}

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

              <div>Subscriber URL</div>
              <TextField
                fullWidth
                variant="outlined"
                {...register('subscriberUrl', {
                  required: 'Subscriber URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
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

      <ConfigurationBox>
        <SettlementHeader>
          <NetworkIdentityHeader>
            <BankIcon />
            <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
          </NetworkIdentityHeader>
          <ButtonGroup>
            <ActionButton
              variant="outlined"
              onClick={() => append({ providerId: '', ifscCode: '', accountNumber: '', bankName: '' })}
            >
              <AddIcon />
              Add Provider
            </ActionButton>
            <BulkButton variant="contained">
              <UploadIcon />
              Bulk upload
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
                placeholder="Enter provider ID"
                {...register(`providers.${index}.providerId`, {
                  required: 'Provider ID is required',
                  pattern: {
                    value: /^[A-Z0-9]+$/,
                    message: 'Provider ID must be alphanumeric',
                  },
                })}
                error={!!errors.providers?.[index]?.providerId}
                helperText={errors.providers?.[index]?.providerId?.message}
              />

              <div>IFSC Code</div>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter IFSC Code"
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
                placeholder="Enter account number"
                {...register(`providers.${index}.accountNumber`, {
                  required: 'Account number is required',
                  pattern: {
                    value: /^\d{9,18}$/,
                    message: 'Account number must be between 9 and 18 digits',
                  },
                })}
                error={!!errors.providers?.[index]?.accountNumber}
                helperText={errors.providers?.[index]?.accountNumber?.message}
              />

              <div>Bank Name</div>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter bank name"
                {...register(`providers.${index}.bankName`, {
                  required: 'Bank name is required',
                  minLength: {
                    value: 3,
                    message: 'Bank name must be at least 3 characters long',
                  },
                })}
                error={!!errors.providers?.[index]?.bankName}
                helperText={errors.providers?.[index]?.bankName?.message}
              />
            </FormContainer>
          </DomainConfigContainer>
        ))}
      </ConfigurationBox>

      <SaveButtonContainer>
        <BulkButton variant="contained" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          <SaveIcon />
          {isLoading ? 'Submitting...' : 'Save & Proceed'}
        </BulkButton>
      </SaveButtonContainer>
    </Container>
  )
}

export default NetworkConfiguration
