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
  displayEmpty?: boolean
  renderValue?: (value: unknown) => React.ReactNode
}

const Select: React.FC<CustomSelectProps> = ({ 
  label, 
  options, 
  displayEmpty, 
  renderValue, 
  ...props 
}) => {
  return (
    <StyledFormControl size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <MUISelect 
        displayEmpty={displayEmpty}
        renderValue={renderValue}
        {...props}
      >
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