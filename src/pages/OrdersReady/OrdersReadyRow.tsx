import React, { useState, useRef } from 'react'
import { Popover, Checkbox, Box } from '@mui/material'
// import { Edit } from '@mui/icons-material'
import Calendar from 'components/common/Calendar'
import { IOrdersReadyRowProps } from './types'
import {
  StyledTableBodyCell,
  // ActionIconButton
} from 'styles/components/Table.styled'
import { DOMAIN_CATEGORY_LABELS } from 'constants/domains'
import Button from 'components/common/Button'
import CalendarIcon from 'assets/images/svg/CalendarIcon'
import { formatCurrency } from 'utils/helpers'

interface ExtendedOrdersReadyRowProps extends IOrdersReadyRowProps {
  onEditClick: (orderId: string) => void
}

const OrdersReadyRow: React.FC<ExtendedOrdersReadyRowProps> = ({
  order,
  selected,
  onCheckboxChange,
  onDueDateChange,
  editedDueDates,
  // onEditClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleOpenCalendar = (): void => {
    setAnchorEl(ref.current)
  }

  const handleCloseCalendar = (): void => {
    setAnchorEl(null)
  }

  const handleDateChange = (date: Date | null): void => {
    if (date) {
      onDueDateChange(order.orderId, date.toISOString())
    }

    handleCloseCalendar()
  }

  return (
    <>
      <StyledTableBodyCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={(e) => onCheckboxChange(order.id, e.target.checked)}
          inputProps={{ 'aria-label': 'select order' }}
        />
      </StyledTableBodyCell>

      <StyledTableBodyCell>{order.orderId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.collectorId}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.receiverId}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.totalOrderValue)}</StyledTableBodyCell>
      <StyledTableBodyCell>{formatCurrency(order.commission)}</StyledTableBodyCell>
      <StyledTableBodyCell>{order.sellerType}</StyledTableBodyCell>
      <StyledTableBodyCell>{DOMAIN_CATEGORY_LABELS[order.domain]}</StyledTableBodyCell>

      <StyledTableBodyCell>
        <Box ref={ref}>
          {order.dueDate ? (
            new Date(order.dueDate).toLocaleDateString()
          ) : (
            <>
              <Button variant="outlined" startIcon={<CalendarIcon />} size="small" onClick={handleOpenCalendar}>
                {editedDueDates.get(order.orderId) || 'Select'}
              </Button>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseCalendar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <Calendar value={order.dueDate ? new Date(order.dueDate) : null} onChange={handleDateChange} />
              </Popover>
            </>
          )}
        </Box>
      </StyledTableBodyCell>

      {/* <StyledTableBodyCell>
        {!order.dueDate && (
          <ActionIconButton size="small" onClick={() => onEditClick(order.orderId)}>
            <Edit fontSize="small" />
          </ActionIconButton>
        )}
      </StyledTableBodyCell> */}
    </>
  )
}

export default OrdersReadyRow
