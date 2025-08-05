import { ITableColumn } from '@interfaces/table'
import { IOrder } from '@interfaces/order'

export const receiverOptions = [
  { value: 'BPP_001', label: 'BPP_001' },
  { value: 'BPP_002', label: 'BPP_002' },
  { value: 'BPP_003', label: 'BPP_003' },
]

export const columns: ITableColumn<IOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'orderStatus', label: 'Order Status' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'bffPercent', label: 'BFF %' },
  { id: 'dueDate', label: 'Due Date' },
]
