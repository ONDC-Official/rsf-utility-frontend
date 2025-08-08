import { FC, useState, useEffect } from 'react'
import { Popover, Button as MuiButton } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import DateInputField from 'components/common/DateInputField'
import { IDateRangePickerButtonProps } from 'components/common/DateRangePickerButton/types'
import { OutlinedFilterButton } from 'styles/components/Button.styled'
import {
  PopoverContainer,
  PopoverTitle,
  DateFieldsContainer,
  ActionsContainer,
} from 'styles/components/DateRangePickerButton.styled'

const DateRangePickerButton: FC<IDateRangePickerButtonProps> = ({
  onDateRangeChange,
  selectedDateRange = { startDate: null, endDate: null },
  variant = 'outlined',
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [startDateInput, setStartDateInput] = useState('')
  const [endDateInput, setEndDateInput] = useState('')

  useEffect(() => {
    if (selectedDateRange.startDate) {
      setStartDateInput(formatDateForInput(selectedDateRange.startDate))
    } else {
      setStartDateInput('')
    }

    if (selectedDateRange.endDate) {
      setEndDateInput(formatDateForInput(selectedDateRange.endDate))
    } else {
      setEndDateInput('')
    }
  }, [selectedDateRange])

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatDateForDisplay = (date: Date): string =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  const parseInputDate = (dateString: string): Date | null => {
    if (!dateString) return null
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? null : date
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setStartDateInput(event.target.value)
  }

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndDateInput(event.target.value)
  }

  const handleApply = (): void => {
    const startDate = parseInputDate(startDateInput)
    const endDate = parseInputDate(endDateInput)

    if (startDate && endDate && startDate <= endDate && onDateRangeChange) {
      onDateRangeChange({ startDate, endDate })
      handleClose()
    }
  }

  const handleClear = (): void => {
    setStartDateInput('')
    setEndDateInput('')
    if (onDateRangeChange) {
      onDateRangeChange({ startDate: null, endDate: null })
    }

    handleClose()
  }

  const getButtonText = (): string => {
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      return `${formatDateForDisplay(selectedDateRange.startDate)} - ${formatDateForDisplay(selectedDateRange.endDate)}`
    }

    return 'Filter by date'
  }

  const canApply = (): boolean => {
    const startDate = parseInputDate(startDateInput)
    const endDate = parseInputDate(endDateInput)
    return !!(startDate && endDate && startDate <= endDate)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <OutlinedFilterButton variant={variant} startIcon={<CalendarToday />} onClick={handleClick} disabled={disabled}>
        {getButtonText()}
      </OutlinedFilterButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            style: {
              marginTop: 8,
              padding: 0,
            },
          },
        }}
      >
        <PopoverContainer>
          <PopoverTitle variant="body2" color="text.secondary">
            Select date range
          </PopoverTitle>

          <DateFieldsContainer>
            <DateInputField
              label="Start Date"
              type="date"
              value={startDateInput}
              onChange={handleStartDateChange}
              size="small"
            />
            <DateInputField
              label="End Date"
              type="date"
              value={endDateInput}
              onChange={handleEndDateChange}
              size="small"
            />
          </DateFieldsContainer>

          <ActionsContainer>
            <MuiButton variant="text" onClick={handleClear} size="small">
              Clear
            </MuiButton>
            <MuiButton variant="contained" onClick={handleApply} disabled={!canApply()} size="small">
              Apply
            </MuiButton>
          </ActionsContainer>
        </PopoverContainer>
      </Popover>
    </>
  )
}

export default DateRangePickerButton
