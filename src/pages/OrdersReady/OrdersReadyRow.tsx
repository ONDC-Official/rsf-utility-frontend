import React from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import { IOrdersReadyRowProps } from 'pages/OrdersReady/types'

const OrdersReadyRow: React.FC<IOrdersReadyRowProps> = ({
  order = {
    id: '',
    orderId: '',
    collectorId: '',
    receiverId: '',
    totalOrderValue: 0,
    commission: 0,
    sellerType: '',
    dueDate: '',
  },
  selected = false,
  onCheckboxChange = () => {},
}) => (
  <TableRow key={order.id}>
    <TableCell padding="checkbox">
      <Checkbox checked={selected} onChange={(e) => onCheckboxChange(order.id, e.target.checked)} />
    </TableCell>
    <TableCell>{order.orderId || 'N/A'}</TableCell>
    <TableCell>{order.collectorId || 'N/A'}</TableCell>
    <TableCell>{order.receiverId || 'N/A'}</TableCell>
    <TableCell>₹{order.totalOrderValue?.toFixed(2) ?? '0.00'}</TableCell>
    <TableCell>₹{order.commission?.toFixed(2) ?? '0.00'}</TableCell>
    <TableCell>{order.sellerType || 'N/A'}</TableCell>
    <TableCell>{order.dueDate || 'N/A'}</TableCell>
  </TableRow>
)

export default OrdersReadyRow
