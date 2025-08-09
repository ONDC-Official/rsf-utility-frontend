import { ITableColumn } from 'interfaces/table'
import { IOutgoingRequest, IIncomingRequest } from 'interfaces/reconciliationManager'
import { IReconciliationDataItem } from 'hooks/queries/useGetReconciliationData'

export const receiverOptions = [
  { value: 'RECV001', label: 'RECV001' },
  { value: 'RECV002', label: 'RECV002' },
  { value: 'RECV003', label: 'RECV003' },
]

export const reconRequestColumns: ITableColumn<IReconciliationDataItem>[] = [
  { id: 'order_id', label: 'Order ID' },
  { id: 'collector_id', label: 'Collector ID' },
  { id: 'total_order_value', label: 'Total Value' },
  { id: 'collector_settlement', label: 'Settlement Amount' },
  { id: 'commission', label: 'Commission' },
  { id: 'status', label: 'Order Status' },
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
