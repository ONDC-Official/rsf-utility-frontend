import React from 'react'
import { TextFieldProps, InputAdornment, Box } from '@mui/material'
import { StyledTextField } from '@styles/components/InputField.styled'
import { CustomDateLabel } from '@styles/pages/SettlementGenerator.styled'

interface CustomInputFieldProps extends Omit<TextFieldProps, 'variant'> {
  trailingIcon?: React.ReactNode
  customLabel?: string
}

const InputField: React.FC<CustomInputFieldProps> = ({ trailingIcon, customLabel, label, ...props }) => {
  return (
    <Box>
      {customLabel && <CustomDateLabel>{customLabel}</CustomDateLabel>}
      <StyledTextField
        variant="outlined"
        size="small"
        fullWidth
        label={!customLabel ? label : undefined}
        InputProps={{
          endAdornment: trailingIcon ? <InputAdornment position="end">{trailingIcon}</InputAdornment> : undefined,
        }}
        {...props}
      />
    </Box>
  )
}

export default InputField