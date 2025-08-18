import React, { FC, useState } from 'react'
import { Visibility, Edit } from '@mui/icons-material'
// import { Event } from '@mui/icons-material'
import SummaryCard from 'components/common/SummaryCard'
// import InputField from 'components/common/InputField'
import OrderSummaryFormModal from './OrderSummaryFormModal'
import { IProps } from './types'
import {
  SummaryContainer as Container,
  SummaryCards,
  Divider,
  // CustomDateSection,
  ButtonSection,
} from 'styles/pages/SettlementGenerator.styled'
import Button from 'components/common/Button'
import { Typography } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

const SummarySection: FC<IProps> = ({
  // summary,
  // customDueDate,
  // setCustomDueDate,
  onGeneratePreview,
  selectedOrderIds,
  formInputs,
  setFormInputs,
  selectedOrders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalInterNpSettlement = selectedOrders.reduce((total, order) => {
    return total + (order.inter_np_settlement || 0)
  }, 0)

  return (
    <Container>
      <Typography variant={TypographyVariant.H6Bold}>Settlement Summary</Typography>

      <SummaryCards>
        <SummaryCard label="Selected Orders" value={selectedOrders.length} bgColor="#F59E0B" />
        <SummaryCard
          label="Total Settlement Amount"
          value={`₹${totalInterNpSettlement.toLocaleString()}`}
          bgColor="#EF4444"
        />
        {/* <SummaryCard label="Batch Size" value={summary.batchSize} bgColor="#3B82F6" /> */}
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

        <Button
          variant="contained"
          startIcon={<Visibility />}
          onClick={onGeneratePreview}
          disabled={selectedOrderIds.length === 0}
        >
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
