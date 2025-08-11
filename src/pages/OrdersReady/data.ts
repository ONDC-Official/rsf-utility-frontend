import { ITableColumn } from 'interfaces/table'
import { IOrderReady } from 'interfaces/ordersReady'

export const columns: ITableColumn<IOrderReady>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'commission', label: 'BFF (Commission)' },
  { id: 'sellerType', label: 'Seller Type' },
  { id: 'domain', label: 'Domain' },
  { id: 'dueDate', label: 'Due Date' },
]
