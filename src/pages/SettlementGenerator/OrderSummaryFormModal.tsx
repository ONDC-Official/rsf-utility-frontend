import { FC } from 'react'
import { Modal } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { IOrderSummaryModalProps } from './types'
import {
  ModalContainer,
  Content,
  Header,
  ModalTitle,
  CloseButton,
  StyledForm,
  ButtonContainer,
  OrderSummaryFormBox,
  OrderSummaryFormRow,
} from 'styles/pages/SettlementGenerator.styled'
import InputField from 'components/common/InputField'
import Button from 'components/common/Button'
import { ISettleNpDataItem } from '@interfaces/settlementGenerator'
import { useUserContext } from 'context/userContext'

type FormValues = Record<string, ISettleNpDataItem>

const OrderSummaryFormModal: FC<IOrderSummaryModalProps> = ({
  open,
  selectedOrderIds,
  formInputs,
  setFormInputs,
  onClose,
  onConfirm,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: formInputs,
    mode: 'onChange',
  })

  const { selectedUser } = useUserContext()

  const onSubmit = (data: FormValues): void => {
    const sanitizedData: Record<string, ISettleNpDataItem> = {}

    for (const orderId of Object.keys(data)) {
      const entry = data[orderId]
      sanitizedData[orderId] = {
        order_id: orderId,
        self_value: Number(entry.self_value) || 0,
        ...(selectedUser?.msn === true && {
          provider_value: Number(entry.provider_value) || 0,
        }),
      }
    }

    setFormInputs(sanitizedData)
    onConfirm()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Content>
          <Header>
            <ModalTitle>Update Selected Orders</ModalTitle>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <OrderSummaryFormBox>
              {selectedOrderIds.map((orderId) => (
                <OrderSummaryFormRow key={orderId}>
                  <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Order ID: {orderId}</div>

                  <Controller
                    name={`${orderId}.self_value`}
                    control={control}
                    rules={{ required: true, min: 0 }}
                    render={({ field }) => (
                      <InputField
                        label="Self Amount *"
                        placeholder="Enter self amount"
                        {...field}
                        value={field.value ?? ''}
                        size="small"
                        style={{ marginRight: '1rem', flex: 1 }}
                        inputProps={{ min: '0' }}
                        required
                      />
                    )}
                  />

                  {selectedUser?.msn && (
                    <Controller
                      name={`${orderId}.provider_value`}
                      control={control}
                      rules={{ required: true, min: 0 }}
                      render={({ field }) => (
                        <InputField
                          label="Provider Amount"
                          placeholder="Enter provider amount"
                          {...field}
                          value={field.value ?? ''}
                          size="small"
                          style={{ flex: 1 }}
                          inputProps={{ min: '0' }}
                        />
                      )}
                    />
                  )}
                </OrderSummaryFormRow>
              ))}
            </OrderSummaryFormBox>

            <ButtonContainer>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit" disabled={!isValid}>
                Confirm
              </Button>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </ModalContainer>
    </Modal>
  )
}

export default OrderSummaryFormModal
