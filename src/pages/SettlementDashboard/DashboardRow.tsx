import React from 'react'
import { Checkbox, Tooltip } from '@mui/material'
import { Info } from '@mui/icons-material'
import StatusChip from 'components/common/StatusChip'
import {
  StyledTableBodyCell,
  TableBodyCheckboxCell,
  ActionButton,
  ErrorInfoContainer,
} from 'styles/components/Table.styled'
import { TABLE_CELL_DEFAULTS, CURRENCY_SYMBOL, ACTION_LABELS } from 'pages/SettlementDashboard/constants'
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
    settlementReference: '',
    error: '',
    settlementInitiatedDate: '',
  },
  selected = false,
  onCheckboxChange,
}) => {
  const formatCurrency = (amount: number | undefined): string => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_ORDER_VALUE}`
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return TABLE_CELL_DEFAULTS.SETTLEMENT_INITIATED_DATE
    return dateString
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
      <StyledTableBodyCell>{order.settlementReference || TABLE_CELL_DEFAULTS.SETTLEMENT_REFERENCE}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {order.error ? (
          <ErrorInfoContainer>
            <Tooltip title={order.error}>
              <Info fontSize="small" color="error" />
            </Tooltip>
            <span>{order.error.length > 20 ? `${order.error.substring(0, 20)}...` : order.error}</span>
          </ErrorInfoContainer>
        ) : (
          TABLE_CELL_DEFAULTS.ERROR
        )}
      </StyledTableBodyCell>
      <StyledTableBodyCell>{formatDate(order.settlementInitiatedDate)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <ActionButton>{ACTION_LABELS.RECONCILE}</ActionButton>
      </StyledTableBodyCell>
    </>
  )
}

export default DashboardRow
