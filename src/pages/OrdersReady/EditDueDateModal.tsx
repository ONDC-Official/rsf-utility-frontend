import { FC, useState } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close, Event } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import usePatchOrderDueDate from 'hooks/mutations/usePatchOrder'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import { useToast } from 'context/toastContext'
import { ORDER_PATCH_MESSAGES } from 'constants/toastMessages'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  CloseButton,
  StyledForm,
  ButtonContainer,
} from 'styles/pages/ReconciliationManager.styled'
import { TypographyVariant } from 'enums/typography'

interface EditDueDateModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  orderId: string
  onEditSuccess?: (message: string) => void
}

const EditDueDateModal: FC<EditDueDateModalProps> = ({ open, onClose, onConfirm, orderId, onEditSuccess }) => {
  const [dueDate, setDueDate] = useState('')

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const toast = useToast()
  const patchOrderDueDate = usePatchOrderDueDate(selectedUser?._id || '')

  const handleConfirm = async (): Promise<void> => {
    if (!orderId || !dueDate) {
      return
    }

    try {
      showLoader()

      const payload = [
        {
          order_id: orderId,
          due_date: dueDate,
        },
      ]

      const res = await patchOrderDueDate.patchOrderAsync(payload)

      hideLoader()
      setDueDate('')
      onConfirm()

      if (res.success) {
        toast(ORDER_PATCH_MESSAGES.SUCCESS)
      }

      if (onEditSuccess) {
        onEditSuccess('Due date updated successfully!')
      }
    } catch (error) {
      hideLoader()
      toast(ORDER_PATCH_MESSAGES.ERROR)

      if (onEditSuccess) {
        onEditSuccess('Failed to update due date')
      }
    }
  }

  const handleCancel = (): void => {
    onClose()
    setDueDate('')
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-due-date-modal">
      <Container>
        <Content>
          <Header>
            <Typography variant={TypographyVariant.H6Bold}>Edit Due Date</Typography>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm style={{ padding: '0 24px 24px 24px' }}>
            <Typography variant={TypographyVariant.Body1Regular}>Edit due date for Order ID: {orderId}</Typography>

            <InputField
              label="Due Date *"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              type="date"
              required
            />

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" onClick={handleCancel}>
                Cancel
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" onClick={handleConfirm} startIcon={<Event />}>
                Update Due Date
              </ContainedExportButton>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </Container>
    </Modal>
  )
}

export default EditDueDateModal
