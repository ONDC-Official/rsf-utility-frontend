import { ITableColumn } from 'interfaces/table'
import { IOrder } from 'interfaces/order'

export const columns: ITableColumn<IOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector' },
  { id: 'receiverId', label: 'Receiver' },
  { id: 'orderStatus', label: 'Order Status' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  {
    id: 'bffPercent',
    label: (
      <div style={{ lineHeight: '16px' }}>
        <div>BFF</div>
        <div>(Commission)</div>
      </div>
    ),
  },
  { id: 'domain', label: 'Domain' },
  { id: 'dueDate', label: 'Due Date' },
]
