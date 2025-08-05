import { ISettlementSummary } from 'interfaces/settlementGenerator'

export interface Props {
  summary: ISettlementSummary
  customDueDate: string
  setCustomDueDate: (val: string) => void
  onGeneratePreview: () => void
}

export interface ModeSelectionProps {
  isManualMode: boolean
  onToggleMode: (checked: boolean) => void
  counterpartyId: string
  setCounterpartyId: (value: string) => void
}
