import { FC, useState } from 'react'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { ICalendarProps } from 'components/common/Calendar/types'

const Calendar: FC<ICalendarProps> = ({ value, onChange, disabled = false, minDate, maxDate }) => {
  const [currentDate, setCurrentDate] = useState(value || new Date())

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (day: number): void => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    // Check if the selected date is before minDate
    if (minDate) {
      const minDateWithoutTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      const selectedDateWithoutTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
      if (selectedDateWithoutTime < minDateWithoutTime) {
        return // Don't allow selection of past dates
      }
    }

    // Check if the selected date is after maxDate
    if (maxDate) {
      const maxDateWithoutTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
      const selectedDateWithoutTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      )
      if (selectedDateWithoutTime > maxDateWithoutTime) {
        return // Don't allow selection of future dates beyond maxDate
      }
    }

    if (onChange) {
      onChange(selectedDate)
    }
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const today = new Date()

  return (
    <Paper elevation={1} sx={{ p: 2, width: 280 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={handlePrevMonth} size="small">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Week days */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={0} mb={1}>
        {weekDays.map((day) => (
          <Box key={day} textAlign="center" py={0.5}>
            <Typography variant="caption" color="text.secondary" fontWeight="bold">
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar days */}
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <Box key={`empty-${index}`} height={36} />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          const isToday =
            today.getDate() === day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear()
          const isSelected =
            value &&
            value.getDate() === day &&
            value.getMonth() === currentDate.getMonth() &&
            value.getFullYear() === currentDate.getFullYear()

          // Check if day is disabled due to minDate/maxDate
          let isDisabledDate = false
          if (minDate) {
            const minDateWithoutTime = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
            const dayDateWithoutTime = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate())
            if (dayDateWithoutTime < minDateWithoutTime) {
              isDisabledDate = true
            }
          }

          if (maxDate && !isDisabledDate) {
            const maxDateWithoutTime = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
            const dayDateWithoutTime = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate())
            if (dayDateWithoutTime > maxDateWithoutTime) {
              isDisabledDate = true
            }
          }

          return (
            <Box
              key={day}
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={36}
              width={36}
              sx={{
                cursor: disabled || isDisabledDate ? 'default' : 'pointer',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'primary.main' : isToday ? 'primary.light' : 'transparent',
                color: isDisabledDate
                  ? 'text.disabled'
                  : isSelected
                  ? 'primary.contrastText'
                  : isToday
                  ? 'primary.main'
                  : 'text.primary',
                border: isToday && !isSelected ? '1px solid' : 'none',
                borderColor: 'primary.main',
                opacity: isDisabledDate ? 0.3 : 1,
                '&:hover':
                  !disabled && !isDisabledDate
                    ? {
                        backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
                      }
                    : {},
                transition: 'all 0.2s ease',
              }}
              onClick={() => !disabled && !isDisabledDate && handleDateClick(day)}
            >
              <Typography variant="body2" fontWeight={isSelected ? 'bold' : 'normal'}>
                {day}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Paper>
  )
}

export default Calendar
