import { FC, ChangeEvent } from 'react'
import { Modal } from '@mui/material'
import { Close } from '@mui/icons-material'
import InputField from 'components/common/InputField'
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
import Button from 'components/common/Button'

const OrderSummaryFormModal: FC<IOrderSummaryModalProps> = ({
  open,
  selectedOrderIds,
  formInputs,
  setFormInputs,
  onClose,
  onConfirm,
}) => {
  const handleInputChange = (orderId: string, field: 'self_value' | 'provider_value', value: string) => {
    const numericValue = value === '' ? '' : Number(value)

    setFormInputs((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: numericValue,
        order_id: orderId,
      },
    }))
  }

  const isFormValid = selectedOrderIds.every((orderId) => {
    const input = formInputs[orderId]
    return (
      typeof input?.self_value === 'number' &&
      !isNaN(input.self_value) &&
      typeof input?.provider_value === 'number' &&
      !isNaN(input.provider_value)
    )
  })

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

          <StyledForm>
            <OrderSummaryFormBox>
              {selectedOrderIds.map((orderId) => (
                <OrderSummaryFormRow key={orderId}>
                  <div style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Settlement ID: {orderId}</div>

                  <InputField
                    label="Self Amount"
                    placeholder="Enter self amount"
                    value={formInputs[orderId]?.self_value !== undefined ? String(formInputs[orderId].self_value) : ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(orderId, 'self_value', e.target.value)
                    }
                    size="small"
                    style={{ marginRight: '1rem', flex: 1 }}
                    inputProps={{ min: '0' }}
                  />

                  <InputField
                    label="Provider Amount"
                    placeholder="Enter provider amount"
                    value={
                      formInputs[orderId]?.provider_value !== undefined
                        ? String(formInputs[orderId].provider_value)
                        : ''
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(orderId, 'provider_value', e.target.value)
                    }
                    size="small"
                    style={{ flex: 1 }}
                    inputProps={{ min: '0' }}
                  />
                </OrderSummaryFormRow>
              ))}
            </OrderSummaryFormBox>

            <ButtonContainer>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <Button variant="contained" onClick={onConfirm} disabled={!isFormValid}>
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
