import { IUserSettlementItem } from 'interfaces/settlement'
import { ISettlementOrder, ISettlementSummary, ISettleNpDataItem } from 'interfaces/settlementGenerator'

export interface IProps {
  summary: ISettlementSummary
  customDueDate: string
  setCustomDueDate: (val: string) => void
  onGeneratePreview: () => void
  selectedOrderIds: string[]
  formInputs: Record<string, ISettleNpDataItem>
  setFormInputs: React.Dispatch<React.SetStateAction<Record<string, ISettleNpDataItem>>>
}

export interface IOrderFormInput {
  self_value: string
  provider_value: string
}

export interface IReinitiateReconiliationModalProps {
  data: Partial<ISettlementOrder> | null
  open: boolean
  onClose: () => void
  onSave: (updated: Partial<ISettlementOrder>) => void
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

export interface IOrderTableProps {
  allOrders: IUserSettlementItem[]
  onSelectedOrdersChange: (selected: Set<string>) => void
}

export interface IOrderSummaryModalProps {
  open: boolean
  selectedOrderIds: string[]
  formInputs: Record<string, ISettleNpDataItem>
  setFormInputs: React.Dispatch<React.SetStateAction<Record<string, ISettleNpDataItem>>>
  onClose: () => void
  onConfirm: () => void
}
