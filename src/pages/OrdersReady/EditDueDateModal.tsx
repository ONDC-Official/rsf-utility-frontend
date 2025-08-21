import { FC } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close, Event } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
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

interface FormData {
  dueDate: string
}

const EditDueDateModal: FC<EditDueDateModalProps> = ({ open, onClose, onConfirm, orderId, onEditSuccess }) => {
  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const toast = useToast()
  const patchOrderDueDate = usePatchOrderDueDate(selectedUser?._id || '')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      dueDate: '',
    },
  })

  const onSubmit = async (formData: FormData): Promise<void> => {
    if (!orderId || !formData.dueDate) {
      return
    }

    try {
      showLoader()

      const payload = [
        {
          order_id: orderId,
          due_date: formData.dueDate,
        },
      ]

      const res = await patchOrderDueDate.patchOrderAsync(payload)

      if (res.success) {
        toast(ORDER_PATCH_MESSAGES.SUCCESS)
        reset()
        onConfirm() // This will trigger refetch in parent component
      } else {
        toast(ORDER_PATCH_MESSAGES.ERROR)
      }

      if (onEditSuccess) {
        onEditSuccess(res.success ? 'Due date updated successfully!' : 'Failed to update due date')
      }
    } catch (error) {
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
    reset()
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

          <StyledForm onSubmit={handleSubmit(onSubmit)} style={{ padding: '0 24px 24px 24px' }}>
            <Typography variant={TypographyVariant.Body1Regular}>Edit due date for Order ID: {orderId}</Typography>

            <Controller
              name="dueDate"
              control={control}
              rules={{
                required: 'Due date is required',
                validate: {
                  notPastDate: (value) => {
                    if (!value) return true
                    const selectedDate = new Date(value)
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return selectedDate >= today || 'Due date cannot be in the past'
                  },
                },
              }}
              render={({ field }) => (
                <InputField
                  label="Due Date *"
                  {...field}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate?.message}
                  placeholder="YYYY-MM-DD"
                  type="date"
                  required
                />
              )}
            />

            <ButtonContainer>
              <OutlinedFilterButton variant="outlined" type="button" onClick={handleCancel}>
                Cancel
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" type="submit" startIcon={<Event />}>
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
