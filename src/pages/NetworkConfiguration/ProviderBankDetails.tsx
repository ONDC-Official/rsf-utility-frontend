import { FC } from 'react'
import { useFieldArray, Controller } from 'react-hook-form'
import BankIcon from 'assets/images/svg/BankIcon'
import AddIcon from 'assets/images/svg/AddIcon'
import RemoveIcon from 'assets/images/svg/RemoveIcon'
import { IProviderBankDetailsProps } from 'pages/NetworkConfiguration/type'
import { defaultProvider } from './data'
import {
  ConfigurationBox,
  SettlementHeader,
  NetworkIdentityHeader,
  NetworkIdentityTitle,
  DomainConfigContainer,
  ConfigHeader,
  FormContainer,
  StyledInput,
} from 'styles/pages/NetworkConfiguration'
import { Typography } from '@mui/material'
import Button from 'components/common/Button'

const ProviderBankDetails: FC<IProviderBankDetailsProps> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'providers',
  })

  return (
    <ConfigurationBox>
      <SettlementHeader>
        <NetworkIdentityHeader>
          <BankIcon />
          <NetworkIdentityTitle>Provider Bank Account Details</NetworkIdentityTitle>
        </NetworkIdentityHeader>
        <Button variant="outlined" onClick={() => append(defaultProvider)}>
          <AddIcon /> Add Provider
        </Button>
      </SettlementHeader>

      {fields.map((field, index) => (
        <DomainConfigContainer key={field.id}>
          <ConfigHeader>
            <div>Provider {index + 1}</div>
            {fields.length > 1 && (
              <Button variant="text">
                <RemoveIcon onClick={() => remove(index)} />
              </Button>
            )}
          </ConfigHeader>

          <FormContainer>
            {/* Provider ID */}

            <div>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Provider Name
              </Typography>
              <Controller
                control={control}
                name={`providers.${index}.providerName`}
                rules={{}}
                render={({ field }) => (
                  <StyledInput
                    placeholder="Enter Provider Name"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.providers?.[index]?.providerName}
                    helperText={errors.providers?.[index]?.providerName?.message}
                  />
                )}
              />
            </div>

            <div>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Provider ID
              </Typography>
              <Controller
                control={control}
                name={`providers.${index}.providerId`}
                rules={{}}
                render={({ field }) => (
                  <StyledInput
                    placeholder="Enter Provider ID"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.providers?.[index]?.providerId}
                    helperText={errors.providers?.[index]?.providerId?.message}
                  />
                )}
              />
            </div>

            {/* IFSC Code */}
            <div>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                IFSC Code
              </Typography>
              <Controller
                control={control}
                name={`providers.${index}.ifscCode`}
                rules={{
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: 'Invalid IFSC code',
                  },
                }}
                render={({ field }) => (
                  <StyledInput
                    placeholder="Enter IFSC Code"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.providers?.[index]?.ifscCode}
                    helperText={errors.providers?.[index]?.ifscCode?.message}
                  />
                )}
              />
            </div>

            {/* Account Number */}
            <div>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Account Number
              </Typography>
              <Controller
                control={control}
                name={`providers.${index}.accountNumber`}
                rules={{
                  pattern: {
                    value: /^\d{9,18}$/,
                    message: 'Must be 9-18 digits',
                  },
                }}
                render={({ field }) => (
                  <StyledInput
                    placeholder="Enter Account Number"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.providers?.[index]?.accountNumber}
                    helperText={errors.providers?.[index]?.accountNumber?.message}
                  />
                )}
              />
            </div>

            {/* Bank Name */}
            <div>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Bank Name
              </Typography>
              <Controller
                control={control}
                name={`providers.${index}.bankName`}
                rules={{
                  minLength: {
                    value: 3,
                    message: 'Minimum 3 characters',
                  },
                }}
                render={({ field }) => (
                  <StyledInput
                    placeholder="Enter Bank Name"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    inputRef={field.ref}
                    error={!!errors.providers?.[index]?.bankName}
                    helperText={errors.providers?.[index]?.bankName?.message}
                  />
                )}
              />
            </div>
          </FormContainer>
        </DomainConfigContainer>
      ))}
    </ConfigurationBox>
  )
}

export default ProviderBankDetails
