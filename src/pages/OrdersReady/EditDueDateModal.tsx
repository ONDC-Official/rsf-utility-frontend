import { FC, useState } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close, Event } from '@mui/icons-material'
import DateInput from 'components/common/DateInput'
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
  const [error, setError] = useState('')

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const toast = useToast()
  const patchOrderDueDate = usePatchOrderDueDate(selectedUser?._id || '')

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null

    // Handle dd/mm/yyyy format from DateInput component
    const parts = dateString.split(/[-/]/)
    if (parts.length !== 3) return null

    // Assume dd/mm/yyyy format
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1 // months are 0-indexed
    const year = parseInt(parts[2], 10)

    const date = new Date(year, month, day)

    // Validate the date
    if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
      return date
    }

    return null
  }

  const formatDateForAPI = (dateString: string): string => {
    const date = parseDate(dateString)
    if (!date) return ''
    // Format as YYYY-MM-DD for API
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const validateDueDate = (value: string): string => {
    if (!value) {
      return 'Due date is required'
    }

    const selectedDate = parseDate(value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!selectedDate) {
      return 'Please enter a valid date'
    }

    if (selectedDate < today) {
      return 'Due date cannot be in the past'
    }

    return ''
  }

  const handleConfirm = async (): Promise<void> => {
    const validationError = validateDueDate(dueDate)
    if (validationError) {
      setError(validationError)
      return
    }

    if (!orderId || !dueDate) {
      return
    }

    try {
      showLoader()

      const payload = [
        {
          order_id: orderId,
          due_date: formatDateForAPI(dueDate),
        },
      ]

      const res = await patchOrderDueDate.patchOrderAsync(payload)

      if (res?.success) {
        toast(ORDER_PATCH_MESSAGES.SUCCESS)
        handleCancel() // Reset and close modal
        onConfirm() // This will trigger refetch in parent component

        if (onEditSuccess) {
          onEditSuccess('Due date updated successfully!')
        }
      } else {
        toast(ORDER_PATCH_MESSAGES.ERROR)
        if (onEditSuccess) {
          onEditSuccess('Failed to update due date')
        }
      }
    } catch (error) {
      console.error('Error updating due date:', error)
      toast(ORDER_PATCH_MESSAGES.ERROR)
      if (onEditSuccess) {
        onEditSuccess('Failed to update due date')
      }
    } finally {
      hideLoader()
    }
  }

  const handleCancel = (): void => {
    onClose()
    setDueDate('')
    setError('')
  }

  const handleDateChange = (value: string): void => {
    setDueDate(value)

    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  return (
    <Modal open={open} onClose={handleCancel} aria-labelledby="edit-due-date-modal">
      <Container>
        <Content>
          <Header>
            <Typography variant={TypographyVariant.H6Bold}>Edit Due Date</Typography>
            <CloseButton onClick={handleCancel}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm>
            <Typography variant={TypographyVariant.Body1Regular}>Edit due date for Order ID: {orderId}</Typography>

            <div style={{ marginBottom: '8px' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Due Date *
              </Typography>
              <DateInput
                value={dueDate}
                onChange={handleDateChange}
                placeholder="dd/mm/yyyy"
                error={!!error}
                helperText={error}
              />
            </div>

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" onClick={handleCancel}>
                Cancel
              </OutlinedFilterButton>
              <ContainedExportButton
                variant="contained"
                onClick={handleConfirm}
                startIcon={<Event />}
                disabled={!dueDate || !!error}
              >
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
