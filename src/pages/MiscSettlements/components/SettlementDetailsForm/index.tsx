import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Typography, MenuItem, Select } from '@mui/material'
import {
  SettlementDetailsContainer,
  FieldRow,
  FieldLabelBox,
  FieldInputBox,
  FieldBox,
  Divider,
  BottomAlignedTypography,
  DeleteButton,
  SettleHeader,
} from 'styles/pages/MiscSettlements.styled'
import InputField from 'components/common/InputField'
import { TypographyVariant } from 'enums/typography'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'
import Blockchain from 'assets/images/svg/Blockchain'
import { useUserContext } from 'context/userContext'

interface Props {
  defaultValues: MiscSettlementFormValues
  onChange: (values: MiscSettlementFormValues) => void
  onDelete?: () => void
  showDelete?: boolean
}

const SettlementDetailsForm: React.FC<Props> = ({ defaultValues, onChange, onDelete, showDelete }) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useForm<MiscSettlementFormValues>({
    defaultValues,
  })

  const { selectedUser } = useUserContext()
  const provider_details = selectedUser?.provider_details || []

  const handleFieldChange = (fieldName: keyof MiscSettlementFormValues, value: string) => {
    onChange({ ...defaultValues, [fieldName]: value })
  }

  const handleProviderSelect = (providerId: string) => {
    const selectedProvider = provider_details.find((p) => p.provider_id === providerId)
    if (selectedProvider) {
      setValue('providerName', selectedProvider.bank_name)
      setValue('bankAccountNumber', selectedProvider.account_number)
      setValue('ifscCode', selectedProvider.ifsc_code)
      handleFieldChange('providerName', selectedProvider.bank_name)
      handleFieldChange('bankAccountNumber', selectedProvider.account_number)
      handleFieldChange('ifscCode', selectedProvider.ifsc_code)
    }
  }

  return (
    <SettlementDetailsContainer>
      <SettleHeader>
        <BottomAlignedTypography variant={TypographyVariant.H5Bold}>
          <Blockchain style={{ marginRight: 4 }} />
          Settlement Details
        </BottomAlignedTypography>

        {showDelete && <DeleteButton onClick={onDelete} />}
      </SettleHeader>

      <FieldRow>
        <FieldLabelBox>
          <Typography variant={TypographyVariant.H6Semibold}>Amount to Transfer to Self</Typography>
        </FieldLabelBox>
        <FieldInputBox>
          <Controller
            control={control}
            name="selfAmount"
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <InputField
                {...field}
                placeholder="00.0"
                fullWidth
                error={!!errors.selfAmount}
                helperText={errors.selfAmount?.message}
                onChange={(e) => {
                  field.onChange(e)
                  handleFieldChange('selfAmount', e.target.value)
                }}
              />
            )}
          />
        </FieldInputBox>
      </FieldRow>

      {provider_details.length > 0 && <Divider>OR</Divider>}

      {provider_details.length > 0 && (
        <>
          <FieldRow>
            <FieldLabelBox>
              <Typography variant={TypographyVariant.H6Semibold}>Amount to Transfer to Provider</Typography>
            </FieldLabelBox>
            <FieldInputBox>
              <Controller
                control={control}
                name="providerAmount"
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder="00.0"
                    fullWidth
                    error={!!errors.providerAmount}
                    helperText={errors.providerAmount?.message}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('providerAmount', e.target.value)
                    }}
                  />
                )}
              />
            </FieldInputBox>
          </FieldRow>

          <FieldRow>
            <FieldBox>
              <Typography variant={TypographyVariant.Caption1}>Select Provider</Typography>
              <Controller
                control={control}
                name="providerId"
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      handleProviderSelect(e.target.value)
                    }}
                  >
                    {provider_details.map((provider) => (
                      <MenuItem key={provider.provider_id} value={provider.provider_id}>
                        {provider.provider_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FieldBox>
          </FieldRow>

          {/* Bank Details */}
          <FieldRow>
            <FieldBox>
              <Typography variant={TypographyVariant.Caption1}>Bank Account Number</Typography>
              <Controller
                control={control}
                name="bankAccountNumber"
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder="Enter account number"
                    fullWidth
                    error={!!errors.bankAccountNumber}
                    helperText={errors.bankAccountNumber?.message}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('bankAccountNumber', e.target.value)
                    }}
                  />
                )}
              />
            </FieldBox>

            <FieldBox>
              <Typography variant={TypographyVariant.Caption1}>IFSC Code</Typography>
              <Controller
                control={control}
                name="ifscCode"
                rules={{ required: 'Required' }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder="Enter IFSC code"
                    fullWidth
                    error={!!errors.ifscCode}
                    helperText={errors.ifscCode?.message}
                    onChange={(e) => {
                      field.onChange(e)
                      handleFieldChange('ifscCode', e.target.value)
                    }}
                  />
                )}
              />
            </FieldBox>
          </FieldRow>
        </>
      )}
    </SettlementDetailsContainer>
  )
}

export default SettlementDetailsForm
