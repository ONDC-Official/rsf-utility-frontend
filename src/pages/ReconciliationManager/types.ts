import { IReconciliationOrder, IOutgoingRequest, IIncomingRequest } from 'interfaces/reconciliationManager'

export interface IReconRequestTableProps {
  allOrders: IReconciliationOrder[]
  onCheckboxSelect: () => void
}

export interface IOutgoingRequestsTableProps {
  requests: IOutgoingRequest[]
  onReinitiate: (order: IOutgoingRequest) => void
}

export interface IReinitiateModalProps {
  open: boolean
  onClose: () => void
  order: IOutgoingRequest | null
}

export interface IGenerateReconRequestProps {
  allOrders: IReconciliationOrder[]
  onToastShow: (message: string) => void
}

export interface IReconciliationTabsProps {
  activeTab: number
  onTabChange: (value: number) => void
}

export interface IGenerateReconRequestProps {
  allOrders: IReconciliationOrder[]
  onToastShow: (message: string) => void
}

export interface IOutgoingRequestsTableProps {
  requests: IOutgoingRequest[]
  onReinitiate: (order: IOutgoingRequest) => void
}

export interface IReconciliationTabsProps {
  activeTab: number
  onTabChange: (value: number) => void
}

export interface IReconRequestTableProps {
  allOrders: IReconciliationOrder[]
  onCheckboxSelect: () => void
}

export interface IAcceptModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  order: IIncomingRequest | null
}

export interface IIncomingRequestsTableProps {
  data: IIncomingRequest[]
  onAccept: (order: IIncomingRequest) => void
  onReject: (order: IIncomingRequest) => void
}

export interface IReviewReconRequestsProps {
  onToastShow: (message: string) => void
}

export interface IHeaderSectionProps {
  showGenerateButton?: boolean
}
