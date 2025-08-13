import { FC, useEffect } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import InputField from 'components/common/InputField'
import { RECONCILIATION_LABELS } from 'pages/SettlementGenerator/constants'
import { IReinitiateReconciliationModalProps } from 'pages/SettlementGenerator/types'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  CloseButton,
  StyledForm,
  FormRow,
  ButtonContainer,
} from 'styles/pages/SettlementGenerator.styled'
import { TypographyVariant } from 'enums/typography'

export interface SettlementPayload {
  order_id: string
  total_order_value: number
  commission: number
  collector_settlement: number
  tds: number
  tcs: number
  withholding_amount: number
  inter_np_settlement: number
}

const ReinitiateReconciliationModal: FC<
  IReinitiateReconciliationModalProps & { onSave: (data: SettlementPayload) => void }
> = ({ open, onClose, data, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettlementPayload>({
    defaultValues: {
      order_id: data?.order_id || '',
      total_order_value: 0,
      commission: 0,
      collector_settlement: 0,
      tds: 0,
      tcs: 0,
      withholding_amount: 0,
      inter_np_settlement: 0,
    },
  })

  useEffect(() => {
    if (data) {
      reset({
        order_id: data.order_id || '',
        total_order_value: data.total_order_value ?? 0,
        commission: data.commission ?? 0,
        collector_settlement: data.collector_settlement ?? 0,
        tds: data.tds ?? 0,
        tcs: data.tcs ?? 0,
        withholding_amount: data.withholding_amount ?? 0,
        inter_np_settlement: data.inter_np_settlement ?? 0,
      })
    }
  }, [data, reset])

  const onSubmit = (formData: SettlementPayload) => {
    onSave(formData)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Content>
          <Header>
            <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.MODAL_TITLE}</Typography>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <Controller
                name="order_id"
                control={control}
                rules={{ required: 'Order ID is required' }}
                render={({ field }) => (
                  <InputField
                    label={`${RECONCILIATION_LABELS.FORM_ORDER_ID} *`}
                    {...field}
                    error={!!errors.order_id}
                    helperText={errors.order_id?.message}
                    placeholder="Enter Order ID"
                    required
                  />
                )}
              />
              <Controller
                name="total_order_value"
                control={control}
                rules={{
                  required: 'Settlement Amount is required',
                  min: { value: 0, message: 'Must be >= 0' },
                }}
                render={({ field }) => (
                  <InputField
                    label={RECONCILIATION_LABELS.FORM_SETTLEMENT_AMOUNT}
                    {...field}
                    error={!!errors.total_order_value}
                    helperText={errors.total_order_value?.message}
                    placeholder="Order Amount"
                    type="number"
                    disabled
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
            </FormRow>

            <FormRow>
              <Controller
                name="commission"
                control={control}
                rules={{
                  required: 'Commission is required',
                  min: { value: 0, message: 'Must be >= 0' },
                }}
                render={({ field }) => (
                  <InputField
                    label={`${RECONCILIATION_LABELS.FORM_COMMISSION} *`}
                    {...field}
                    error={!!errors.commission}
                    helperText={errors.commission?.message}
                    placeholder="Enter Commission"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                    required
                  />
                )}
              />
              <Controller
                name="tcs"
                control={control}
                rules={{ min: { value: 0, message: 'Must be >= 0' } }}
                render={({ field }) => (
                  <InputField
                    label={RECONCILIATION_LABELS.FORM_TCS}
                    {...field}
                    error={!!errors.tcs}
                    helperText={errors.tcs?.message}
                    placeholder="Enter TCS"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
            </FormRow>

            <FormRow>
              <Controller
                name="tds"
                control={control}
                rules={{ min: { value: 0, message: 'Must be >= 0' } }}
                render={({ field }) => (
                  <InputField
                    label={RECONCILIATION_LABELS.FORM_TDS}
                    {...field}
                    error={!!errors.tds}
                    helperText={errors.tds?.message}
                    placeholder="Enter TDS"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
              <Controller
                name="withholding_amount"
                control={control}
                rules={{ min: { value: 0, message: 'Must be >= 0' } }}
                render={({ field }) => (
                  <InputField
                    label={RECONCILIATION_LABELS.FORM_WITHHOLDING_AMOUNT}
                    {...field}
                    error={!!errors.withholding_amount}
                    helperText={errors.withholding_amount?.message}
                    placeholder="Enter Withholding Amount"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
            </FormRow>

            <FormRow>
              <Controller
                name="inter_np_settlement"
                control={control}
                rules={{ min: { value: 0, message: 'Must be >= 0' } }}
                render={({ field }) => (
                  <InputField
                    label="Inter NP Settlement"
                    {...field}
                    error={!!errors.inter_np_settlement}
                    helperText={errors.inter_np_settlement?.message}
                    placeholder="Enter Inter NP Settlement"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
              <Controller
                name="collector_settlement"
                control={control}
                rules={{ min: { value: 0, message: 'Must be >= 0' } }}
                render={({ field }) => (
                  <InputField
                    label="Collector Settlement"
                    {...field}
                    error={!!errors.collector_settlement}
                    helperText={errors.collector_settlement?.message}
                    placeholder="Enter Collector Settlement"
                    type="number"
                    inputProps={{ min: 0, step: 'any' }}
                  />
                )}
              />
            </FormRow>

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" type="button" onClick={onClose}>
                {RECONCILIATION_LABELS.FORM_CANCEL}
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" type="submit">
                {RECONCILIATION_LABELS.FORM_SAVE}
              </ContainedExportButton>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </Container>
    </Modal>
  )
}

export default ReinitiateReconciliationModal
