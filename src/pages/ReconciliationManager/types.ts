import { IReconciliationOrder, IOutgoingRequest, IIncomingRequest } from 'interfaces/reconciliationManager'
import { IReconciliationDataItem } from 'hooks/queries/useGetReconciliationData'

export interface IReconRequestTableProps {
  allOrders?: IReconciliationOrder[]
  onCheckboxSelect: (selectedCount: number, selectedSettlements: IReconciliationDataItem[]) => void
  onExport?: () => void
}

export interface IOutgoingRequestsTableProps {
  requests?: IOutgoingRequest[]
  onReinitiate: (order: IOutgoingRequest) => void
  onExport?: () => void
}

export interface IReinitiateModalProps {
  open: boolean
  onClose: () => void
  order: IOutgoingRequest | null
  onReinitiate?: (order: IOutgoingRequest, formData: any) => Promise<void>
}

export interface IGenerateReconRequestProps {
  onToastShow: (message: string) => void
  onSelectionChange?: (count: number, canGenerate: boolean, generateHandler: () => Promise<void>) => void
}

export interface IReconciliationTabsProps {
  activeTab: number
  onTabChange: (value: number) => void
}

export interface IAcceptModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  order: IIncomingRequest | null
  onAcceptSuccess?: (message: string) => void
}

export interface IIncomingRequestsTableProps {
  data?: IIncomingRequest[]
  onAccept: (order: IIncomingRequest) => void
  onReject: (order: IIncomingRequest) => void
  onSettleOffline?: (order: IIncomingRequest) => void
  onExport?: () => void
}

export interface IReviewReconRequestsProps {
  onToastShow: (message: string) => void
}

export interface IHeaderSectionProps {
  showGenerateButton?: boolean
  isGenerateButtonDisabled?: boolean
  onGenerateClick?: () => void
}
