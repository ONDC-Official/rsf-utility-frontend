import React from 'react'
import { Checkbox, Box } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { IOrdersReadyRowProps } from './types'
import { StyledTableBodyCell, ActionIconButton } from 'styles/components/Table.styled'
import { DOMAIN_CATEGORY_LABELS } from 'constants/domains'
import { formatCurrency } from 'utils/helpers'
import { formatDate } from 'utils/formatters'

interface ExtendedOrdersReadyRowProps extends IOrdersReadyRowProps {
  onEditClick: (orderId: string) => void
}

const OrdersReadyRow: React.FC<ExtendedOrdersReadyRowProps> = ({ order, selected, onCheckboxChange, onEditClick }) => {
  return (
    <>
      <StyledTableBodyCell>
        <Checkbox size="small" checked={selected} onChange={(e) => onCheckboxChange(order.id, e.target.checked)} />
      </StyledTableBodyCell>

      <StyledTableBodyCell>{order.orderId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collectorId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.receiverId}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.totalOrderValue)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.sellerType}</StyledTableBodyCell>
      <StyledTableBodyCell>{DOMAIN_CATEGORY_LABELS[order.domain]}</StyledTableBodyCell>

      <StyledTableBodyCell>
        <Box>
          {order.dueDate ? (
            formatDate(order.dueDate)
          ) : (
            <ActionIconButton size="small" onClick={() => onEditClick(order.orderId)}>
              <Edit fontSize="small" />
            </ActionIconButton>
          )}
        </Box>
      </StyledTableBodyCell>
    </>
  )
}

export default OrdersReadyRow
