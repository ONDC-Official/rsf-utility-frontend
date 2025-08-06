import React from 'react'
import { Checkbox } from '@mui/material'
import { IOrdersReadyRowProps } from 'pages/OrdersReady/types'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { TABLE_CELL_DEFAULTS, CURRENCY_SYMBOL } from 'pages/OrdersReady/constants'

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
  onCheckboxChange = () => {
    // Default empty function
  },
}) => {
  const formatCurrency = (amount: number | undefined) => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_ORDER_VALUE}`
  }

  return (
    <>
      <TableBodyCheckboxCell>
        <Checkbox checked={selected} onChange={(e) => onCheckboxChange(order.id, e.target.checked)} size="small" />
      </TableBodyCheckboxCell>
      <StyledTableBodyCell>{order.orderId || TABLE_CELL_DEFAULTS.ORDER_ID}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collectorId || TABLE_CELL_DEFAULTS.COLLECTOR_ID}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.receiverId || TABLE_CELL_DEFAULTS.RECEIVER_ID}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.totalOrderValue)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.sellerType || TABLE_CELL_DEFAULTS.SELLER_TYPE}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.dueDate || TABLE_CELL_DEFAULTS.DUE_DATE}</StyledTableBodyCell>
    </>
  )
}

export default OrdersReadyRow
