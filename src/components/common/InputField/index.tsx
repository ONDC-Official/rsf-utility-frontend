import { FC } from 'react'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField, InputLabel, InputContainer } from 'styles/components/InputField.styled'

const InputField: FC<ICustomInputFieldProps & Omit<TextFieldProps, 'label'>> = ({ endAdornment, label, ...props }) => (
  <InputContainer>
    {label && <InputLabel>{label}</InputLabel>}
    <StyledTextField
      InputProps={{
        endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
      }}
      fullWidth
      {...props}
    />
  </InputContainer>
)

export default InputField
