import { ITableColumn } from 'interfaces/table'
import { IOrder } from 'interfaces/order'

export const columns: ITableColumn<IOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'orderStatus', label: 'Order Status' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'bffPercent', label: 'BFF (Commission) %' },
  { id: 'domain', label: 'Domain' },
  { id: 'dueDate', label: 'Due Date' },
]
