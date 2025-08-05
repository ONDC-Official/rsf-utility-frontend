import { ReactNode } from 'react'
import { TextFieldProps } from '@mui/material'

export interface ICustomInputFieldProps extends Omit<TextFieldProps, 'variant'> {
  trailingIcon?: ReactNode
  customLabel?: string
}
