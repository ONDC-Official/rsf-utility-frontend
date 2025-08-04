import React from 'react'
import { InputLabel, Select as MUISelect, MenuItem, SelectProps } from '@mui/material'
import { StyledFormControl } from '@styles/components/Select.styled'

interface SelectOption {
  value: string | number
  label: string
}

interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  label?: string
  options: SelectOption[]
}

const Select: React.FC<CustomSelectProps> = ({ label, options, ...props }) => {
  return (
    <StyledFormControl size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <MUISelect {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </StyledFormControl>
  )
}

export default Select
