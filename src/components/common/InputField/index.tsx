import { FC } from 'react'
import { InputAdornment, Box, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField } from 'styles/components/InputField.styled'

const InputField: FC<ICustomInputFieldProps & TextFieldProps> = ({ trailingIcon, ...props }) => (
  <Box>
    <StyledTextField
      fullWidth
      InputProps={{
        endAdornment: trailingIcon ? <InputAdornment position="end">{trailingIcon}</InputAdornment> : undefined,
      }}
      {...props}
    />
  </Box>
)

export default InputField
