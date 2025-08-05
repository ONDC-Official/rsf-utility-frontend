import { FC } from 'react'
import { InputAdornment, Box, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField } from 'styles/components/InputField.styled'

const InputField: FC<ICustomInputFieldProps & TextFieldProps> = ({
  trailingIcon,
  label,
  variant = 'outlined',
  size = 'small',
  ...props
}) => (
  <Box>
    <StyledTextField
      fullWidth
      label={label || ''}
      variant={variant}
      size={size}
      InputProps={{
        endAdornment: trailingIcon ? <InputAdornment position="end">{trailingIcon}</InputAdornment> : undefined,
      }}
      {...props}
    />
  </Box>
)

export default InputField
