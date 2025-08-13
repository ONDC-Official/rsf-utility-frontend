import { IUserSettlementItem, SettlementPayload } from 'interfaces/settlement'
import { ISettlementSummary, ISettleNpDataItem } from 'interfaces/settlementGenerator'

export interface IProps {
  summary: ISettlementSummary
  customDueDate: string
  setCustomDueDate: (val: string) => void
  onGeneratePreview: () => void
  selectedOrderIds: string[]
  formInputs: Record<string, ISettleNpDataItem>
  setFormInputs: React.Dispatch<React.SetStateAction<Record<string, ISettleNpDataItem>>>
  selectedOrders: IUserSettlementItem[]
}

export interface IOrderFormInput {
  self_value: string
  provider_value: string
}

export interface IReinitiateReconciliationModalProps {
  data: Partial<SettlementPayload> | null
  open: boolean
  onClose: () => void
  onSave: (updated: Partial<SettlementPayload>) => void
}

export interface IModeSelectionProps {
  isManualMode: boolean
  onToggleMode: (checked: boolean) => void
  counterpartyId: string
  setCounterpartyId: (value: string) => void
}

export interface IPayloadPreviewProps {
  data: Record<string, unknown>
  onTrigger: () => Promise<void>
  open: boolean
  onClose: () => void
}

export interface IOrderTableProps {
  counterpartyOptions: any
  counterpartyId: string
  setCounterpartyId: any
  allOrders: IUserSettlementItem[]
  editedRows: Record<string, Partial<IUserSettlementItem>>
  setEditedRows: (data: any) => void
  onSelectedOrdersChange: (selected: Set<string>) => void
  handlePatchSettlements: () => Promise<void>
  onExport: () => void
  refetchOrders: () => void
  onDateRangeChange?: (dateRange: { startDate: Date | null; endDate: Date | null }) => void
}

export interface IOrderSummaryModalProps {
  open: boolean
  selectedOrderIds: string[]
  formInputs: Record<string, ISettleNpDataItem>
  setFormInputs: React.Dispatch<React.SetStateAction<Record<string, ISettleNpDataItem>>>
  onClose: () => void
  onConfirm: () => void
}
