import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Typography } from '@mui/material'
import {
  SettlementDetailsContainer,
  FieldRow,
  FieldLabelBox,
  FieldInputBox,
  FieldBox,
  Divider,
  // ActionButtons,
  // RotatedSendIcon,
  BottomAlignedTypography,
  DeleteButton,
  SettleHeader,
} from 'styles/pages/MiscSettlements.styled'
import InputField from 'components/common/InputField'
// import Button from 'components/common/Button'
import { TypographyVariant } from 'enums/typography'
import { MiscSettlementFormValues } from '@interfaces/miscSettlements'
import Blockchain from 'assets/images/svg/Blockchain'
import { useUserContext } from 'context/userContext'

interface Props {
  onSubmit: (values: MiscSettlementFormValues) => void
  isSubmitting?: boolean
  onDelete?: () => void
  showDelete?: boolean
}

const SettlementDetailsForm: React.FC<Props> = ({
  onSubmit,
  // isSubmitting,
  onDelete,
  showDelete,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MiscSettlementFormValues>({
    defaultValues: {
      selfAmount: '',
      providerId: '',
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

  const { selectedUser } = useUserContext()

  const provider_details = selectedUser?.provider_details || []

  return (
    <SettlementDetailsContainer>
      <SettleHeader>
        <BottomAlignedTypography variant={TypographyVariant.H5Bold}>
          <Blockchain style={{ marginRight: 4 }} />
          Settlement Details
        </BottomAlignedTypography>

        {showDelete && <DeleteButton onClick={onDelete} />}
      </SettleHeader>

      <form onSubmit={internalSubmit} noValidate>
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
                />
              )}
            />
          </FieldInputBox>
        </FieldRow>

        {provider_details?.length > 0 && <Divider>OR</Divider>}

        {provider_details?.length > 0 && (
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
                    />
                  )}
                />
              </FieldInputBox>
            </FieldRow>

            <FieldRow>
              <FieldBox>
                <Typography variant={TypographyVariant.Caption1}>Provider ID</Typography>
                <Controller
                  control={control}
                  name="providerId"
                  rules={{ required: 'Required' }}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      placeholder="Enter provider ID"
                      fullWidth
                      error={!!errors.providerId}
                      helperText={errors.providerId?.message}
                    />
                  )}
                />
              </FieldBox>

              <FieldBox>
                <Typography variant={TypographyVariant.Caption1}>Provider Name</Typography>
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
            </FieldRow>

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
                    />
                  )}
                />
              </FieldBox>
            </FieldRow>
          </>
        )}

        {/* <ActionButtons>
          <Button type="submit" variant="contained" startIcon={<RotatedSendIcon />} disabled={isSubmitting}>
            Create a Trigger Settlement
          </Button>
        </ActionButtons> */}
      </form>
    </SettlementDetailsContainer>
  )
}

export default SettlementDetailsForm
