import React from 'react'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import { Typography } from '@mui/material'
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
import Select from 'components/common/Select'
import { useUserContext } from 'context/userContext'

type ParentFormValues = {
  settlements: MiscSettlementFormValues[]
}

interface Provider {
  provider_id: string
  provider_name: string
  bank_name?: string
  account_number?: string
  ifsc_code?: string
}

interface Props {
  control: Control<ParentFormValues>
  index: number
  providers: Provider[]
  setValue: UseFormSetValue<ParentFormValues>
  onRemove: () => void
  showDelete?: boolean
}

const SettlementDetailsForm: React.FC<Props> = ({ control, index, providers, setValue, onRemove, showDelete }) => {
  const { selectedUser } = useUserContext()
  const provider_details = providers || []

  const handleProviderSelect = (providerId: string): void => {
    const sel = provider_details.find((p) => p.provider_id === providerId)
    if (!sel) return

    setValue(`settlements.${index}.providerName`, sel.bank_name || '')
    setValue(`settlements.${index}.bankAccountNumber`, sel.account_number || '')
    setValue(`settlements.${index}.ifscCode`, sel.ifsc_code || '')
  }

  return (
    <SettlementDetailsContainer>
      <SettleHeader>
        <BottomAlignedTypography variant={TypographyVariant.H5Bold}>Settlement Details</BottomAlignedTypography>

        {showDelete && <DeleteButton onClick={onRemove} />}
      </SettleHeader>

      <FieldRow>
        <FieldLabelBox>
          <Typography variant={TypographyVariant.H6Semibold}>Amount to Transfer to Self</Typography>
        </FieldLabelBox>
        <FieldInputBox>
          <Controller
            control={control}
            name={`settlements.${index}.selfAmount` as const}
            rules={{ required: 'Required' }}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                placeholder="00.0"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  field.onChange(e)
                }}
              />
            )}
          />
        </FieldInputBox>
      </FieldRow>

      {provider_details?.length > 0 && selectedUser?.msn && <Divider>OR</Divider>}

      {provider_details?.length > 0 && selectedUser?.msn && (
        <>
          <FieldRow>
            <FieldLabelBox>
              <Typography variant={TypographyVariant.H6Semibold}>Amount to Transfer to Provider</Typography>
            </FieldLabelBox>
            <FieldInputBox>
              <Controller
                control={control}
                name={`settlements.${index}.providerAmount` as const}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    placeholder="00.0"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => {
                      field.onChange(e)
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
                name={`settlements.${index}.providerId` as const}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    options={provider_details.map((provider) => ({
                      value: provider.provider_id,
                      label: provider.provider_name,
                    }))}
                    fullWidth
                    error={!!fieldState.error}
                    displayEmpty
                    onChange={(e) => {
                      field.onChange(e)
                      handleProviderSelect(String(e.target.value))
                    }}
                  />
                )}
              />
            </FieldBox>
          </FieldRow>

          <FieldRow>
            <FieldBox>
              <Typography variant={TypographyVariant.Caption1}>Bank Account Number</Typography>
              <Controller
                control={control}
                name={`settlements.${index}.bankAccountNumber` as const}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    placeholder="Enter account number"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                )}
              />
            </FieldBox>

            <FieldBox>
              <Typography variant={TypographyVariant.Caption1}>IFSC Code</Typography>
              <Controller
                control={control}
                name={`settlements.${index}.ifscCode` as const}
                rules={{ required: 'Required' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    placeholder="Enter IFSC code"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    disabled
                    onChange={(e) => {
                      field.onChange(e)
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
