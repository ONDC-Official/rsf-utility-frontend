import React, { FC, useState } from 'react'
import { Visibility, Edit } from '@mui/icons-material'
// import { Event } from '@mui/icons-material'
import SummaryCard from 'components/common/SummaryCard'
// import InputField from 'components/common/InputField'
import OrderSummaryFormModal from './OrderSummaryFormModal'
import { IProps } from './types'
import {
  SummaryContainer as Container,
  SummaryHeader,
  SummaryCards,
  Divider,
  // CustomDateSection,
  ButtonSection,
} from 'styles/pages/SettlementGenerator.styled'
import Button from 'components/common/Button'

const SummarySection: FC<IProps> = ({
  summary,
  // customDueDate,
  // setCustomDueDate,
  onGeneratePreview,
  selectedOrderIds,
  formInputs,
  setFormInputs,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isFormValid = selectedOrderIds.every((orderId) => {
    const input = formInputs[orderId]
    return input?.self_value && input?.provider_value
  })

  return (
    <Container>
      <SummaryHeader>Settlement Summary</SummaryHeader>

      <SummaryCards>
        <SummaryCard label="Selected Orders" value={summary.selectedOrders} bgColor="#F59E0B" />
        <SummaryCard
          label="Total Settlement Amount"
          value={`₹${summary.totalAmount.toLocaleString()}`}
          bgColor="#EF4444"
        />
        <SummaryCard label="Batch Size" value={summary.batchSize} bgColor="#3B82F6" />
      </SummaryCards>

      <Divider />

      {/* <CustomDateSection>
        <InputField
          label="Custom Due Date (optional)"
          placeholder="dd/mm/yyyy"
          value={customDueDate}
          onChange={(e) => setCustomDueDate(e.target.value)}
          endAdornment={<Event />}
          size="small"
        />
      </CustomDateSection> */}

      <ButtonSection>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setIsModalOpen(true)}
          disabled={selectedOrderIds.length === 0}
        >
          Add Self / Provider Amount
        </Button>

        <Button variant="contained" startIcon={<Visibility />} onClick={onGeneratePreview} disabled={!isFormValid}>
          Generate & Preview Payload
        </Button>

        {/* <Button variant="outlined" startIcon={<Event />} disabled={!isFormValid}>
            Schedule Settlement
          </Button> */}
      </ButtonSection>

      <OrderSummaryFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        selectedOrderIds={selectedOrderIds}
        formInputs={formInputs}
        setFormInputs={setFormInputs}
      />
    </Container>
  )
}

export default SummarySection
