import { forwardRef } from 'react'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField, StyledLabel, Container } from 'styles/components/InputField.styled'
import colors from 'theme/colors'

const InputField = forwardRef<HTMLInputElement, ICustomInputFieldProps & Omit<TextFieldProps, 'label'>>(
  ({ endAdornment, label, InputProps, required = false, ...props }, ref) => (
    <Container>
      {label && (
        <StyledLabel>
          {label} {required && <span style={{ color: colors.error.main }}>*</span>}
        </StyledLabel>
      )}
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
