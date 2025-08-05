import React from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import { IOrderReady } from 'interfaces/ordersReady'

interface OrdersReadyRowProps {
  order: IOrderReady
  selected: boolean
  onCheckboxChange: (orderId: string, checked: boolean) => void
}

const OrdersReadyRow: React.FC<OrdersReadyRowProps> = ({ order, selected, onCheckboxChange }) => {
  return (
    <TableRow key={order.id}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onCheckboxChange(order.id, e.target.checked)} />
      </TableCell>
      <TableCell>{order.orderId}</TableCell>
      <TableCell>{order.collectorId}</TableCell>
      <TableCell>{order.receiverId}</TableCell>
      <TableCell>₹{order.totalOrderValue.toFixed(2)}</TableCell>
      <TableCell>₹{order.commission.toFixed(2)}</TableCell>
      <TableCell>{order.sellerType}</TableCell>
      <TableCell>{order.dueDate}</TableCell>
    </TableRow>
  )
}

export default OrdersReadyRow
