import { ButtonProps } from '@mui/material'
import { ReactNode } from 'react'

export interface CustomButtonProps extends ButtonProps {
  children: ReactNode
}
