import React from 'react'
import { Info } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import StatusChip from 'components/common/StatusChip'
import { StyledTableBodyCell, ErrorInfoContainer } from 'styles/components/Table.styled'
import { TABLE_CELL_DEFAULTS, CURRENCY_SYMBOL, ACTION_LABELS } from 'pages/SettlementDashboard/constants'
import { IDashboardRowProps } from 'pages/SettlementDashboard/types'
import Button from 'components/common/Button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'constants/routes.constants'

const DashboardRow: React.FC<IDashboardRowProps> = ({ order }) => {
  const navigate = useNavigate()

  const formatCurrency = (amount: number | undefined): string => {
    return `${CURRENCY_SYMBOL}${amount?.toFixed(2) ?? TABLE_CELL_DEFAULTS.TOTAL_ORDER_VALUE}`
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return TABLE_CELL_DEFAULTS.SETTLEMENT_INITIATED_DATE
    try {
      const date = new Date(dateString)
      return date.toISOString().split('T')[0] // Returns YYYY-MM-DD format
    } catch {
      return dateString // Return original if parsing fails
    }
  }

  const handleReconcileClick = () => {
    navigate(ROUTES.RECONCILIATION)
  }

  return (
    <>
      <StyledTableBodyCell>{order.order_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collector_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.receiver_id}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.total_order_value)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.inter_np_settlement)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.status} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.self_status} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>
        <StatusChip status={order.provider_status} />
      </StyledTableBodyCell>
      <StyledTableBodyCell>{order.settlement_reference}</StyledTableBodyCell>
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
      <StyledTableBodyCell>{formatDate(order.due_date)}</StyledTableBodyCell>
      <StyledTableBodyCell>
        {order?.status === 'NOT_SETTLED' ? (
          <Button variant="outlined" onClick={handleReconcileClick}>
            {ACTION_LABELS.RECONCILE}
          </Button>
        ) : null}
      </StyledTableBodyCell>
    </>
  )
}

export default DashboardRow
