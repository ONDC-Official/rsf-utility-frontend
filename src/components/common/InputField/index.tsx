import { FC } from 'react'
import { InputAdornment, Box, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField } from 'styles/components/InputField.styled'
import { CustomDateLabel } from 'styles/pages/SettlementGenerator.styled'

const InputField: FC<ICustomInputFieldProps & TextFieldProps> = ({
  trailingIcon,
  customLabel,
  label,
  variant = 'outlined',
  size = 'small',
  ...props
}) => (
  <Box>
    {customLabel && <CustomDateLabel>{customLabel}</CustomDateLabel>}
    <StyledTextField
      fullWidth
      label={!customLabel ? label || '' : undefined}
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
