import { ISettlementSummary } from 'interfaces/settlementGenerator'

export interface IProps {
  summary: ISettlementSummary
  customDueDate: string
  setCustomDueDate: (val: string) => void
  onGeneratePreview: () => void
}

export interface IModeSelectionProps {
  isManualMode: boolean
  onToggleMode: (checked: boolean) => void
  counterpartyId: string
  setCounterpartyId: (value: string) => void
}

export interface IPayloadPreviewProps {
  data: Record<string, unknown>
}
