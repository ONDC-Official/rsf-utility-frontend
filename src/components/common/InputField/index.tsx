import { FC } from 'react'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { ICustomInputFieldProps } from 'components/common/InputField/types'
import { StyledTextField, StyledLabel, Container } from 'styles/components/InputField.styled'

const InputField: FC<ICustomInputFieldProps & Omit<TextFieldProps, 'label'>> = ({ endAdornment, label, ...props }) => (
  <Container>
    {label && <StyledLabel>{label}</StyledLabel>}
    <StyledTextField
      InputProps={{
        endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
      }}
      fullWidth
      {...props}
    />
  </Container>
)

export default InputField
