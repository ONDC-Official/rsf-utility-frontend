import { ReactNode } from 'react'
import { TextFieldProps } from '@mui/material'

export interface CustomInputFieldProps extends Omit<TextFieldProps, 'variant'> {
  trailingIcon?: ReactNode
  customLabel?: string
}
