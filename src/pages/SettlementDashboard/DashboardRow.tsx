import React from 'react'
import { Checkbox } from '@mui/material'
import StatusChip from 'components/common/StatusChip'
import { StyledTableBodyCell, TableBodyCheckboxCell } from 'styles/components/Table.styled'
import { TABLE_CELL_DEFAULTS, CURRENCY_SYMBOL } from 'pages/SettlementDashboard/constants'
import { IDashboardRowProps } from 'pages/SettlementDashboard/types'

const DashboardRow: React.FC<IDashboardRowProps> = ({
  order = {
    id: '',
    orderId: '',
    collectorId: '',
    receiverId: '',
    totalOrderValue: 0,
    interNpSettlement: 0,
    commission: 0,
    interNpSettlementStatus: 'Not Settled',
    selfStatus: 'Not Settled',
    providerStatus: 'Not Settled',
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
      <StyledTableBodyCell>{formatCurrency(order.interNpSettlement)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.interNpSettlementStatus} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.selfStatus} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.providerStatus} />
      </StyledTableBodyCell>
    </>
  )
}

export default DashboardRow
