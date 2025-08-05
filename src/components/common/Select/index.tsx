import { FC } from 'react'
import { InputLabel, Select as MUISelect, MenuItem } from '@mui/material'
import { ICustomSelectProps } from 'components/common/Select/types'
import { StyledFormControl } from 'styles/components/Select.styled'

const Select: FC<ICustomSelectProps> = ({
  label,
  options = [],
  displayEmpty,
  renderValue,
  formControlProps,
  ...props
}) => (
  <StyledFormControl size={props.size} {...formControlProps}>
    {label && <InputLabel>{label}</InputLabel>}
    <MUISelect displayEmpty={displayEmpty} renderValue={renderValue} {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MUISelect>
  </StyledFormControl>
)

export default Select
