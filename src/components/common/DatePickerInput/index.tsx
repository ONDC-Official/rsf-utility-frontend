import { FC, useState, useRef } from 'react'
import { Popover, InputAdornment, IconButton } from '@mui/material'
import { CalendarToday } from '@mui/icons-material'
import Calendar from 'components/common/Calendar'
import { IDatePickerInputProps } from 'components/common/DatePickerInput/types'
import { Container, StyledLabel, StyledTextField } from 'styles/components/InputField.styled'

const DatePickerInput: FC<IDatePickerInputProps> = ({
  label,
  value,
  onChange,
  size = 'medium',
  disabled = false,
  placeholder = 'Select date',
  minDate = null,
  maxDate = null,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleInputClick = (): void => {
    if (disabled) return
    setAnchorEl(inputRef.current)
  }

  const handleIconClick = (): void => {
    if (disabled) return
    setAnchorEl(inputRef.current)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleDateChange = (date: Date | null): void => {
    if (onChange) {
      onChange(date)
    }

    handleClose()
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Container>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledTextField
          ref={inputRef}
          fullWidth
          size={size}
          value={formatDateForDisplay(value as Date | null)}
          placeholder={placeholder}
          onClick={handleInputClick}
          disabled={disabled}
          InputProps={{
            style: { cursor: disabled ? 'default' : 'pointer' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIconClick} disabled={disabled} size="small" style={{ padding: 4 }}>
                  <CalendarToday fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>

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
        slotProps={{
          paper: {
            style: {
              marginTop: 8,
              padding: 8,
              overflow: 'hidden',
              width: 'auto',
              minWidth: 280,
            },
          },
        }}
      >
        <Calendar
          value={value}
          onChange={handleDateChange}
          minDate={minDate || undefined}
          maxDate={maxDate || undefined}
        />
      </Popover>
    </>
  )
}

export default DatePickerInput
