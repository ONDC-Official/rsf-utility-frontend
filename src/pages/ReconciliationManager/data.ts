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
  { id: 'collector_id', label: 'Collector' },
  { id: 'receiver_id', label: 'Receiver' },
  { id: 'total_order_value', label: 'Total Order Value' },
  { id: 'collector_settlement', label: 'Inter NP Settlement' },
  { id: 'commission', label: 'BFF (Commission)' },
  { id: 'tcs', label: 'TCS' },
  { id: 'tds', label: 'TDS' },
  { id: 'withholding_amount', label: 'Withholding (Incl. Item Tax)' },
  { id: 'status', label: 'Order Status' },
  { id: 'error', label: 'Error' },
]

export const outgoingRequestColumns: ITableColumn<IOutgoingRequest>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'receiverId', label: 'Receiver' },
  { id: 'collectorId', label: 'Collector' },
  { id: 'status', label: 'Status' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'initiatedDate', label: 'Initiated Date' },
  { id: 'response', label: 'Response' },
  { id: 'actions', label: 'Actions' },
  { id: 'diffValue', label: 'Diff Value' },
]

export const incomingRequestColumns: ITableColumn<IIncomingRequest>[] = [
  { id: 'reconTransactionId', label: 'Recon Transaction ID' },
  { id: 'orderId', label: 'Order ID' },
  { id: 'receiverId', label: 'Receiver' },
  { id: 'collectorId', label: 'Collector' },
  { id: 'status', label: 'Status' },
  { id: 'diffInterNpSettlement', label: 'Inter NP Settlement' },
  { id: 'diffCommission', label: 'Commission' },
  { id: 'diffTcs', label: 'TCS' },
  { id: 'diffTds', label: 'TDS' },
  { id: 'diffWithholding', label: 'Withholding' },
  { id: 'receivedDate', label: 'Received Date' },
  { id: 'actions', label: 'Actions' },
]
