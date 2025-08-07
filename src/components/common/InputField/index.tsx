import { forwardRef } from 'react'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField, StyledLabel, Container } from 'styles/components/InputField.styled'

const InputField = forwardRef<HTMLInputElement, ICustomInputFieldProps & Omit<TextFieldProps, 'label'>>(
  ({ endAdornment, label, InputProps, ...props }, ref) => (
    <Container>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledTextField
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

InputField.displayName = 'InputField'

export default InputField
