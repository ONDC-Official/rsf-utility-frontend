import { FC } from 'react'
import { InputAdornment, Box, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField } from 'styles/components/InputField.styled'

const InputField: FC<ICustomInputFieldProps & TextFieldProps> = ({ endAdornment, ...props }) => (
  <Box>
    <StyledTextField
      InputProps={{
        endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
      }}
      {...props}
    />
  </Box>
)

export default InputField
