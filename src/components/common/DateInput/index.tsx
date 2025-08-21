import { FC, useState, useRef } from 'react'
import { InputAdornment, IconButton, Popover } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { StyledInput } from 'styles/pages/NetworkConfiguration'
import Calendar from 'components/common/Calendar'
import { IDateInputProps } from './types'

const DateInput: FC<IDateInputProps> = ({
  value,
  onChange,
  onBlur,
  name,
  inputRef,
  error,
  helperText,
  placeholder = 'dd/mm/yyyy',
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null

    // Handle different date formats
    const parts = dateString.split(/[-/]/)
    if (parts.length !== 3) return null

    // Assume dd/mm/yyyy or dd-mm-yyyy format
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1 // months are 0-indexed
    const year = parseInt(parts[2], 10)

    const date = new Date(year, month, day)

    // Validate the date
    if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
      return date
    }

    return null
  }

  const handleCalendarIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleCalendarClose = () => {
    setAnchorEl(null)
  }

  const handleDateSelect = (selectedDate: Date | null) => {
    const formattedDate = selectedDate ? formatDate(selectedDate) : ''
    if (onChange) {
      onChange(formattedDate)
    }

    handleCalendarClose()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  const currentDate = value ? parseDate(value) : null
  const open = Boolean(anchorEl)

  return (
    <>
      <StyledInput
        value={value || ''}
        onChange={handleInputChange}
        onBlur={onBlur}
        name={name}
        inputRef={inputRef}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton ref={buttonRef} onClick={handleCalendarIconClick} disabled={disabled} size="small">
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCalendarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { mt: 1 },
        }}
      >
        <Calendar value={currentDate} onChange={handleDateSelect} disabled={disabled} />
      </Popover>
    </>
  )
}

export default DateInput
