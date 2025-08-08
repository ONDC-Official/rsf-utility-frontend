import { FC, useState } from 'react'
import { Modal } from '@mui/material'
import { Close, Event } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IAcceptModalProps } from 'pages/ReconciliationManager/types'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  ModalTitle as Title,
  CloseButton,
  StyledForm,
  ButtonContainer,
  ModalSubtitle,
} from 'styles/pages/ReconciliationManager.styled'

const AcceptModal: FC<IAcceptModalProps> = ({ open, onClose, onConfirm, order }) => {
  const [dueDate, setDueDate] = useState('')

  const handleConfirm = (): void => {
    onConfirm()
    setDueDate('')
  }

  const handleCancel = (): void => {
    onClose()
    setDueDate('')
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="accept-modal-title">
      <Container>
        <Content>
          <Header>
            <Title>{RECONCILIATION_LABELS.ACCEPT_MODAL_TITLE}</Title>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm>
            <ModalSubtitle>
              {RECONCILIATION_LABELS.ACCEPT_MODAL_SUBTITLE} {order?.orderId}
            </ModalSubtitle>

            <InputField
              label={`${RECONCILIATION_LABELS.FORM_DUE_DATE} *`}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              endAdornment={<Event />}
              required
            />

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" onClick={handleCancel}>
                {RECONCILIATION_LABELS.FORM_CANCEL}
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" onClick={handleConfirm} startIcon={<Event />}>
                {RECONCILIATION_LABELS.ACCEPT_BUTTON_TEXT}
              </ContainedExportButton>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </Container>
    </Modal>
  )
}

export default AcceptModal
