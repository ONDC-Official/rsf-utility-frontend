import { FC, useState, useEffect } from 'react'
import { Popover, Button as MuiButton } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import DatePickerInput from 'components/common/DatePickerInput'
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
  const [tempStartDate, setTempStartDate] = useState<Date | null>(selectedDateRange.startDate)
  const [tempEndDate, setTempEndDate] = useState<Date | null>(selectedDateRange.endDate)

  useEffect(() => {
    setTempStartDate(selectedDateRange.startDate)
    setTempEndDate(selectedDateRange.endDate)
  }, [selectedDateRange])

  const formatDateForDisplay = (date: Date): string =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleStartDateChange = (date: Date | null): void => {
    setTempStartDate(date)
    if (date && tempEndDate && date > tempEndDate) {
      setTempEndDate(null)
    }
  }

  const handleEndDateChange = (date: Date | null): void => {
    setTempEndDate(date)
  }

  const handleApply = (): void => {
    if (tempStartDate && tempEndDate && tempStartDate <= tempEndDate && onDateRangeChange) {
      onDateRangeChange({ startDate: tempStartDate, endDate: tempEndDate })
      handleClose()
    }
  }

  const handleClear = (): void => {
    setTempStartDate(null)
    setTempEndDate(null)
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
    return !!(tempStartDate && tempEndDate && tempStartDate <= tempEndDate)
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
            <DatePickerInput
              label="Start Date"
              value={tempStartDate}
              onChange={handleStartDateChange}
              size="small"
              placeholder="Select start date"
            />
            <DatePickerInput
              label="End Date"
              value={tempEndDate}
              onChange={handleEndDateChange}
              size="small"
              placeholder="Select end date"
              minDate={tempStartDate}
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
