import { FC, useState } from 'react'
import { Modal } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  ModalTitle as Title,
  CloseButton,
  StyledForm,
  FormRow,
  ButtonContainer,
  ModalSubtitle,
} from 'styles/pages/ReconciliationManager.styled'

interface IRejectModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  order: IIncomingRequest | null
}

const RejectModal: FC<IRejectModalProps> = ({ open, onClose, onConfirm, order }) => {
  const [formData, setFormData] = useState({
    differenceInAmount: '',
    differenceInCommission: '',
    differenceInTcs: '',
    differenceInTds: '',
    differenceInWithholding: '',
  })

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleConfirm = () => {
    onConfirm()
    setFormData({
      differenceInAmount: '',
      differenceInCommission: '',
      differenceInTcs: '',
      differenceInTds: '',
      differenceInWithholding: '',
    })
  }

  const handleCancel = () => {
    onClose()
    setFormData({
      differenceInAmount: '',
      differenceInCommission: '',
      differenceInTcs: '',
      differenceInTds: '',
      differenceInWithholding: '',
    })
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="reject-modal-title">
      <Container>
        <Content>
          <Header>
            <Title>{RECONCILIATION_LABELS.REJECT_MODAL_TITLE}</Title>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm>
            <ModalSubtitle>
              {RECONCILIATION_LABELS.REJECT_MODAL_SUBTITLE} {order?.orderId}
            </ModalSubtitle>

            <FormRow>
              <InputField
                label={RECONCILIATION_LABELS.FORM_DIFFERENCE_AMOUNT}
                value={formData.differenceInAmount}
                onChange={handleInputChange('differenceInAmount')}
                placeholder="Enter Difference in Amount"
              />
              <InputField
                label={RECONCILIATION_LABELS.FORM_DIFFERENCE_COMMISSION}
                value={formData.differenceInCommission}
                onChange={handleInputChange('differenceInCommission')}
                placeholder="Enter Difference in Commission"
              />
            </FormRow>

            <FormRow>
              <InputField
                label={RECONCILIATION_LABELS.FORM_DIFFERENCE_TCS}
                value={formData.differenceInTcs}
                onChange={handleInputChange('differenceInTcs')}
                placeholder="Enter Difference in TCS"
              />
              <InputField
                label={RECONCILIATION_LABELS.FORM_DIFFERENCE_TDS}
                value={formData.differenceInTds}
                onChange={handleInputChange('differenceInTds')}
                placeholder="Enter Difference in TDS"
              />
            </FormRow>

            <FormRow>
              <InputField
                label={RECONCILIATION_LABELS.FORM_DIFFERENCE_WITHHOLDING}
                value={formData.differenceInWithholding}
                onChange={handleInputChange('differenceInWithholding')}
                placeholder="Enter Difference in Withholding amount"
              />
            </FormRow>

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" onClick={handleCancel}>
                {RECONCILIATION_LABELS.FORM_CANCEL}
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" onClick={handleConfirm} startIcon={<Send />}>
                {RECONCILIATION_LABELS.REJECT_BUTTON_TEXT}
              </ContainedExportButton>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </Container>
    </Modal>
  )
}

export default RejectModal
