import { FC, useState } from 'react'
import { Modal } from '@mui/material'
import { Close, Event } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IAcceptModalProps } from 'pages/ReconciliationManager/types'
import useOnRecon from 'hooks/mutations/useOnRecon'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
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

const AcceptModal: FC<IAcceptModalProps> = ({ open, onClose, onConfirm, order, onAcceptSuccess }) => {
  const [dueDate, setDueDate] = useState('')

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const onRecon = useOnRecon(selectedUser?._id || '')

  const handleConfirm = async (): Promise<void> => {
    if (!order || !dueDate) {
      return
    }

    try {
      showLoader()

      const dueDateISO = new Date(dueDate).toISOString()

      const payload = {
        on_recon_data: [
          {
            order_id: order.orderId,
            recon_accord: true,
            due_date: dueDateISO,
          },
        ],
      }

      await onRecon.onReconAsync(payload)

      hideLoader()
      setDueDate('')
      onConfirm()

      if (onAcceptSuccess) {
        onAcceptSuccess('Reconciliation request accepted successfully!')
      }
    } catch (error) {
      console.error('Error accepting reconciliation request:', error)
      hideLoader()

      if (onAcceptSuccess) {
        onAcceptSuccess('Failed to accept reconciliation request')
      }
    }
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
