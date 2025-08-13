import { FC, useState, useEffect } from 'react'
import { Modal, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import InputField from 'components/common/InputField'
import { RECONCILIATION_LABELS } from 'pages/ReconciliationManager/constants'
import { IReinitiateModalProps } from 'pages/ReconciliationManager/types'
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

const ReinitiateModal: FC<IReinitiateModalProps> = ({ open, onClose, order, onReinitiate }) => {
  const { showLoader, hideLoader } = useLoader()
  const [formData, setFormData] = useState({
    orderId: '',
    settlementAmount: '',
    commission: '',
    tcs: '',
    tds: '',
    withholdingAmount: '',
  })

  // Update form data when order changes
  useEffect(() => {
    if (order) {
      setFormData({
        orderId: order.orderId,
        settlementAmount: '',
        commission: '',
        tcs: '',
        tds: '',
        withholdingAmount: '',
      })
    }
  }, [order])

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (): Promise<void> => {
    if (!order || !onReinitiate) {
      onClose()
      return
    }

    try {
      showLoader()
      await onReinitiate(order, formData)
      hideLoader()
      onClose()
    } catch (error) {
      console.error('Error in reinitiate modal:', error)
      hideLoader()
    }
  }

  const handleCancel = (): void => {
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Container>
        <Content>
          <Header>
            <Typography variant={TypographyVariant.H6Bold}>{RECONCILIATION_LABELS.MODAL_TITLE}</Typography>
            <CloseButton onClick={onClose}>
              <Close />
            </CloseButton>
          </Header>

          <StyledForm>
            <FormRow>
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_ORDER_ID}`}
                value={formData.orderId}
                onChange={handleInputChange('orderId')}
                placeholder="Enter Order ID"
                required
              />
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_SETTLEMENT_AMOUNT}`}
                value={formData.settlementAmount}
                onChange={handleInputChange('settlementAmount')}
                placeholder="Enter Settlement Amount"
                required
              />
            </FormRow>

            <FormRow>
              <InputField
                label={`${RECONCILIATION_LABELS.FORM_COMMISSION}`}
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
              <OutlinedFilterButton variant="outlined" onClick={handleCancel}>
                {RECONCILIATION_LABELS.FORM_CANCEL}
              </OutlinedFilterButton>
              <ContainedExportButton variant="contained" onClick={handleSubmit}>
                {RECONCILIATION_LABELS.FORM_GENERATE}
              </ContainedExportButton>
            </ButtonContainer>
          </StyledForm>
        </Content>
      </Container>
    </Modal>
  )
}

export default ReinitiateModal
