import { FC, useState } from 'react'
import { Modal } from '@mui/material'
import { Close } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { RECONCILIATION_LABELS } from 'pages/SettlementGenerator/constants'
import { IReinitiateReconciliationModalProps } from 'pages/SettlementGenerator/types'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  ModalTitle,
  CloseButton,
  StyledForm,
  FormRow,
  ButtonContainer,
} from 'styles/pages/SettlementGenerator.styled'

const ReinitiateReconciliationModal: FC<IReinitiateReconciliationModalProps> = ({ open, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    orderId: data?.orderId || '',
    settlementAmount: '',
    commission: '',
    tcs: '',
    tds: '',
    withholdingAmount: '',
  })

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedData = {
      orderId: formData.orderId,
      settlementAmount: parseFloat(formData.settlementAmount),
      commission: parseFloat(formData.commission),
      tcs: parseFloat(formData.tcs),
      tds: parseFloat(formData.tds),
      withholdingAmount: parseFloat(formData.withholdingAmount),
    }

    onSave(parsedData)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Content>
          <Header>
            <ModalTitle>{RECONCILIATION_LABELS.MODAL_TITLE}</ModalTitle>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm onSubmit={handleSubmit}>
            <FormRow>
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_ORDER_ID} *`}
                value={formData.orderId}
                onChange={handleInputChange('orderId')}
                placeholder="Enter Order ID"
                required
              />
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_SETTLEMENT_AMOUNT} *`}
                value={formData.settlementAmount}
                onChange={handleInputChange('settlementAmount')}
                placeholder="Enter Settlement Amount"
                required
              />
            </FormRow>

            <FormRow>
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_COMMISSION} *`}
                value={formData.commission}
                onChange={handleInputChange('commission')}
                placeholder="Enter Commission"
                required
              />
              <InputField
                label={RECONCILIATION_LABELS.FORM_TCS}
                value={formData.tcs}
                onChange={handleInputChange('tcs')}
                placeholder="Enter TCS"
              />
            </FormRow>

            <FormRow>
              <InputField
                label={RECONCILIATION_LABELS.FORM_TDS}
                value={formData.tds}
                onChange={handleInputChange('tds')}
                placeholder="Enter TDS"
              />
              <InputField
                label={RECONCILIATION_LABELS.FORM_WITHHOLDING_AMOUNT}
                value={formData.withholdingAmount}
                onChange={handleInputChange('withholdingAmount')}
                placeholder="Enter Withholding Amount"
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
