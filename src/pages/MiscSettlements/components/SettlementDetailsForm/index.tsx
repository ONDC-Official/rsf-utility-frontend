import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Typography } from '@mui/material'
import {
  SettlementDetailsContainer,
  SectionTitle,
  FieldRow,
  FieldLabelBox,
  FieldInputBox,
  FieldBox,
  Divider,
  ActionButtons,
  RotatedSendIcon,
} from 'styles/pages/MiscSettlements.styled'
import InputField from 'components/common/InputField'
import Button from 'components/common/Button'
import { TypographyVariant } from 'enums/typography'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'

interface Props {
  onSubmit: (values: MiscSettlementFormValues) => void
  isSubmitting?: boolean
}

const SettlementDetailsForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MiscSettlementFormValues>({
    defaultValues: {
      selfAmount: '',
      providerAmount: '',
      providerName: '',
      bankAccountNumber: '',
      ifscCode: '',
    },
  })

  const internalSubmit = handleSubmit((values) => {
    onSubmit(values)
    reset()
  })

  return (
    <SettlementDetailsContainer>
      <SectionTitle variant={TypographyVariant.H3Semibold}>Settlement Details</SectionTitle>

      <form onSubmit={internalSubmit} noValidate>
        <FieldRow>
          <FieldLabelBox>
            <Typography variant={TypographyVariant.Body1Medium}>Amount to Transfer to Self</Typography>
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
                />
              )}
            />
          </FieldInputBox>
        </FieldRow>

        <Divider>OR</Divider>

        <FieldRow>
          <FieldLabelBox>
            <Typography variant={TypographyVariant.Body1Medium}>Amount to Transfer to Provider</Typography>
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
                />
              )}
            />
          </FieldInputBox>
        </FieldRow>

        <FieldRow>
          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>Provider Name</Typography>
            <Controller
              control={control}
              name="providerName"
              rules={{ required: 'Required' }}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder="Enter provider name"
                  fullWidth
                  error={!!errors.providerName}
                  helperText={errors.providerName?.message}
                />
              )}
            />
          </FieldBox>

          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>Bank Account Number</Typography>
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
                />
              )}
            />
          </FieldBox>

          <FieldBox>
            <Typography variant={TypographyVariant.Body5Light}>IFSC Code</Typography>
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
                />
              )}
            />
          </FieldBox>
        </FieldRow>

        <ActionButtons>
          <Button type="submit" variant="contained" startIcon={<RotatedSendIcon />} disabled={isSubmitting}>
            Create a Trigger Settlement
          </Button>
        </ActionButtons>
      </form>
    </SettlementDetailsContainer>
  )
}

export default SettlementDetailsForm
