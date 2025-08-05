import { FC } from 'react'
import { InputAdornment, Box } from '@mui/material'
import { CustomInputFieldProps } from '@components/common/InputField/types'
import { StyledTextField } from '@styles/components/InputField.styled'
import { CustomDateLabel } from '@styles/pages/SettlementGenerator.styled'

const InputField: FC<CustomInputFieldProps> = ({ trailingIcon, customLabel, label, ...props }) => (
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

export default InputField
