import { ITableColumn } from 'interfaces/table'
import { IReconciliationOrder, IOutgoingRequest, IIncomingRequest } from 'interfaces/reconciliationManager'

export const receiverOptions = [
  { value: 'RECV001', label: 'RECV001' },
  { value: 'RECV002', label: 'RECV002' },
  { value: 'RECV003', label: 'RECV003' },
]

export const reconRequestColumns: ITableColumn<IReconciliationOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'totalValue', label: 'Total Value' },
  { id: 'settlementAmount', label: 'Settlement Amount' },
  { id: 'commission', label: 'Commission' },
  { id: 'orderStatus', label: 'Order Status' },
  { id: 'error', label: 'Error' },
]

export const outgoingRequestColumns: ITableColumn<IOutgoingRequest>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'status', label: 'Status' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'response', label: 'Response' },
  { id: 'actions', label: 'Actions' },
  { id: 'error', label: 'Error' },
]

export const incomingRequestColumns: ITableColumn<IIncomingRequest>[] = [
  { id: 'reconTransactionId', label: 'Recon Transaction ID' },
  { id: 'orderId', label: 'Order ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'requestedAmount', label: 'Requested Amount' },
  { id: 'currentAmount', label: 'Current Amount' },
  { id: 'requestedCommission', label: 'Requested Commission' },
  { id: 'currentCommission', label: 'Current Commission' },
  { id: 'reason', label: 'Reason' },
  { id: 'receivedDate', label: 'Received Date' },
  { id: 'actions', label: 'Actions' },
]
