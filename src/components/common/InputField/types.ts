import { TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'

export interface CustomInputFieldProps extends Omit<TextFieldProps, 'variant'> {
  trailingIcon?: ReactNode
  customLabel?: string
}
