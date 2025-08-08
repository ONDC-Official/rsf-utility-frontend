import { FC, useState } from 'react'
import { Popover, Box } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import { OutlinedFilterButton } from 'styles/components/Button.styled'
import Calendar from 'components/common/Calendar'
import { IDateFilterButtonProps } from 'components/common/DateFilterButton/types'

const DateFilterButton: FC<IDateFilterButtonProps> = ({
  onDateChange,
  selectedDate = null,
  label = 'Filter by date',
  variant = 'outlined',

  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleDateChange = (date: Date | null): void => {
    if (onDateChange) {
      onDateChange(date)
    }
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <OutlinedFilterButton variant={variant} startIcon={<CalendarToday />} onClick={handleClick} disabled={disabled}>
        {label}
      </OutlinedFilterButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={1}>
          <Calendar value={selectedDate} onChange={handleDateChange} />
        </Box>
      </Popover>
    </>
  )
}

export default DateFilterButton
