import { FC } from 'react'
import { Event, Visibility } from '@mui/icons-material'
import SummaryCard from 'components/common/SummaryCard'
import InputField from 'components/common/InputField'
import { Props } from 'pages/SettlementGenerator/types'
import {
  SummaryContainer as Container,
  SummaryHeader,
  SummaryCards,
  Divider,
  CustomDateSection,
  ButtonSection,
} from 'styles/pages/SettlementGenerator.styled'
import { ContainedExportButton, OutlinedFilterButton } from 'styles/components/Button.styled'

const SummarySection: FC<Props> = ({ summary, customDueDate, setCustomDueDate, onGeneratePreview }) => (
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

    <CustomDateSection>
      <InputField
        customLabel="Custom Due Date (optional)"
        placeholder="dd/mm/yyyy"
        value={customDueDate}
        onChange={(e) => setCustomDueDate(e.target.value)}
        trailingIcon={<Event />}
      />
    </CustomDateSection>

    <ButtonSection>
      <ContainedExportButton variant="contained" startIcon={<Visibility />} onClick={onGeneratePreview}>
        Generate & Preview Payload
      </ContainedExportButton>

      <OutlinedFilterButton variant="outlined" startIcon={<Event />}>
        Schedule Settlement
      </OutlinedFilterButton>
    </ButtonSection>
  </Container>
)

export default SummarySection
