import { SelectProps, FormControlProps } from '@mui/material'

export interface ISelectOption {
  value: string | number
  label: string
}

export interface ICustomSelectProps extends Omit<SelectProps, 'children'> {
  label?: string
  options: ISelectOption[]
  renderValue?: (value: unknown) => React.ReactNode
  formControlProps?: FormControlProps
}
