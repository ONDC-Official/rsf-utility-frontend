import { FC, useState } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close, Send } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { IIncomingRequest } from 'interfaces/reconciliationManager'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import useOnRecon from 'hooks/mutations/useOnRecon'
import { useUserContext } from 'context/userContext'
import { useLoader } from 'context/loaderContext'
import { OutlinedFilterButton, ContainedExportButton } from 'styles/components/Button.styled'
import {
  ModalContainer as Container,
  Content,
  Header,
  CloseButton,
  StyledForm,
  FormRow,
  ButtonContainer,
} from 'styles/pages/ReconciliationManager.styled'
import { TypographyVariant } from 'enums/typography'

interface IRejectModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  order: IIncomingRequest | null
  onRejectSuccess?: (message: string) => void
}

const RejectModal: FC<IRejectModalProps> = ({ open, onClose, onConfirm, order, onRejectSuccess }) => {
  const [formData, setFormData] = useState({
    differenceInAmount: '',
    differenceInCommission: '',
    differenceInTcs: '',
    differenceInTds: '',
    differenceInWithholding: '',
  })

  const { selectedUser } = useUserContext()
  const { showLoader, hideLoader } = useLoader()
  const onRecon = useOnRecon(selectedUser?._id || '')

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleConfirm = async (): Promise<void> => {
    if (!order) {
      return
    }

    try {
      showLoader()

      const payload = {
        on_recon_data: [
          {
            order_id: order.orderId,
            recon_accord: false,
            on_recon_data: {
              settlement_amount: parseFloat(formData.differenceInAmount) || 0,
              commission_amount: parseFloat(formData.differenceInCommission) || 0,
              withholding_amount: parseFloat(formData.differenceInWithholding) || 0,
              tds: parseFloat(formData.differenceInTds) || 0,
              tcs: parseFloat(formData.differenceInTcs) || 0,
            },
          },
        ],
      }

      await onRecon.onReconAsync(payload)

      hideLoader()
      setFormData({
        differenceInAmount: '',
        differenceInCommission: '',
        differenceInTcs: '',
        differenceInTds: '',
        differenceInWithholding: '',
      })
      onConfirm()

      if (onRejectSuccess) {
        onRejectSuccess('Reconciliation request rejected and differences sent successfully!')
      }
    } catch (error) {
      hideLoader()

      if (onRejectSuccess) {
        onRejectSuccess('Failed to reject reconciliation request')
      }
    }
  }

  const handleCancel = (): void => {
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
            <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.REJECT_MODAL_TITLE}</Typography>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm>
            <Typography variant={TypographyVariant.Body1Regular}>
              {RECONCILIATION_LABELS.REJECT_MODAL_SUBTITLE} {order?.orderId}
            </Typography>

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
