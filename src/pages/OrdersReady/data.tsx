import { ITableColumn } from 'interfaces/table'
import { IOrderReady } from 'interfaces/ordersReady'

export const columns: ITableColumn<IOrderReady>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector' },
  { id: 'receiverId', label: 'Receiver' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  {
    id: 'commission',
    label: (
      <div style={{ lineHeight: '16px' }}>
        <div>BFF</div>
        <div>(Commission)</div>
      </div>
    ),
  },
  { id: 'sellerType', label: 'Seller Type' },
  { id: 'domain', label: 'Domain' },
  { id: 'dueDate', label: 'Due Date' },
]
