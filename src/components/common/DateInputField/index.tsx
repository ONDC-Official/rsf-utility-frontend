import { forwardRef } from 'react'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledDateTextField, StyledLabel, Container } from 'styles/components/InputField.styled'

const DateInputField = forwardRef<HTMLInputElement, ICustomInputFieldProps & Omit<TextFieldProps, 'label'>>(
  ({ endAdornment, label, InputProps, ...props }, ref) => (
    <Container>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledDateTextField
        fullWidth
        inputRef={ref}
        InputProps={{
          ...InputProps,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : (
            InputProps?.endAdornment
          ),
        }}
        {...props}
      />
    </Container>
  ),
)

DateInputField.displayName = 'DateInputField'

export default DateInputField
