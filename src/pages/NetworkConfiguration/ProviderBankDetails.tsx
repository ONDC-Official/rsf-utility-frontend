import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
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
  ActionButton,
} from 'styles/pages/NetworkConfiguration'
import { TypographyVariant } from 'enums/typography'

const ProviderBankDetails = ({ control, errors }: IProviderBankDetailsProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'providers' })

  return (
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
      {fields?.map((field, index) => (
        <DomainConfigContainer key={field.id}>
          <ConfigHeader>
            <div>Provider {index + 1}</div>
            {fields.length > 1 && <RemoveIcon onClick={() => remove(index)} />}
          </ConfigHeader>
          <FormContainer>
            <Typography variant={TypographyVariant.Body5Medium}>Provider ID</Typography>
            <TextField
              fullWidth
              placeholder="Enter Provider ID"
              {...control.register(`providers.${index}.providerId`, {
                required: 'Provider ID is required',
                pattern: { value: /^[A-Z0-9]+$/, message: 'Must be alphanumeric' },
              })}
              error={!!errors.providers?.[index]?.providerId}
              helperText={errors.providers?.[index]?.providerId?.message}
            />
            <Typography variant={TypographyVariant.Body5Medium}>IFSC Code</Typography>
            <TextField
              fullWidth
              placeholder="Enter IFSC Code"
              {...control.register(`providers.${index}.ifscCode`, {
                required: 'IFSC Code is required',
                pattern: { value: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Invalid IFSC code' },
              })}
              error={!!errors.providers?.[index]?.ifscCode}
              helperText={errors.providers?.[index]?.ifscCode?.message}
            />
            <Typography variant={TypographyVariant.Body5Medium}>Account Number</Typography>
            <TextField
              fullWidth
              placeholder="Enter Account Number"
              {...control.register(`providers.${index}.accountNumber`, {
                required: 'Account number is required',
                pattern: { value: /^\d{9,18}$/, message: 'Must be 9-18 digits' },
              })}
              error={!!errors.providers?.[index]?.accountNumber}
              helperText={errors.providers?.[index]?.accountNumber?.message}
            />
            <Typography variant={TypographyVariant.Body5Medium}>Bank Name</Typography>
            <TextField
              fullWidth
              placeholder="Enter Bank Name"
              {...control.register(`providers.${index}.bankName`, {
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
  )
}

export default ProviderBankDetails
