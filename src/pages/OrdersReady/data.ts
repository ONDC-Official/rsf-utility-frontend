import { ITableColumn } from 'interfaces/table'
import { IOrderReady } from 'interfaces/ordersReady'

export const RECEIVER_OPTIONS = [
  { value: 'BPP_001', label: 'BPP_001' },
  { value: 'BPP_002', label: 'BPP_002' },
  { value: 'BPP_003', label: 'BPP_003' },
]

export const receiverOptions = [
  { value: 'BPP_001', label: 'BPP_001' },
  { value: 'BPP_002', label: 'BPP_002' },
  { value: 'BPP_003', label: 'BPP_003' },
]

export const columns: ITableColumn<IOrderReady>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'commission', label: 'Commission' },
  { id: 'sellerType', label: 'Seller Type' },
  { id: 'domain', label: 'Domain' },
  { id: 'dueDate', label: 'Due Date' },
]
