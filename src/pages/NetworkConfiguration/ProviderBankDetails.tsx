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
  ActionButton,
  RemoveWrapper,
  StyledInput,
} from 'styles/pages/NetworkConfiguration'
import RequiredFieldLabel from 'components/common/RequiredFieldLabel'

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
        <ActionButton variant="outlined" onClick={() => append(defaultProvider)}>
          <AddIcon /> Add Provider
        </ActionButton>
      </SettlementHeader>

      {fields.map((field, index) => (
        <DomainConfigContainer key={field.id}>
          <ConfigHeader>
            <div>Provider {index + 1}</div>
            {fields.length > 1 && (
              <RemoveWrapper>
                <RemoveIcon onClick={() => remove(index)} />
              </RemoveWrapper>
            )}
          </ConfigHeader>

          <FormContainer>
            {/* Provider ID */}

            <div>
              <RequiredFieldLabel>Provider Name</RequiredFieldLabel>
              <Controller
                control={control}
                name={`providers.${index}.providerName`}
                rules={{ required: 'Provider Name is required' }}
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
              <RequiredFieldLabel>Provider ID</RequiredFieldLabel>
              <Controller
                control={control}
                name={`providers.${index}.providerId`}
                rules={{ required: 'Provider ID is required' }}
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
              <RequiredFieldLabel>IFSC Code</RequiredFieldLabel>
              <Controller
                control={control}
                name={`providers.${index}.ifscCode`}
                rules={{
                  required: 'IFSC Code is required',
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
              <RequiredFieldLabel>Account Number</RequiredFieldLabel>
              <Controller
                control={control}
                name={`providers.${index}.accountNumber`}
                rules={{
                  required: 'Account number is required',
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
              <RequiredFieldLabel>Bank Name</RequiredFieldLabel>
              <Controller
                control={control}
                name={`providers.${index}.bankName`}
                rules={{
                  required: 'Bank name is required',
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
