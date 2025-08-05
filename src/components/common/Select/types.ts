import { SelectProps, FormControlProps } from '@mui/material'

export interface SelectOption {
  value: string | number
  label: string
}

export interface CustomSelectProps extends Omit<SelectProps, 'children'> {
  label?: string
  options: SelectOption[]
  displayEmpty?: boolean
  renderValue?: (value: unknown) => React.ReactNode
  formControlProps?: FormControlProps
}
