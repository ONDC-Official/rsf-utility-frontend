import { TypographyProps } from '@mui/material'
import { TypographyVariant } from 'enums/typography'

export interface RequiredFieldLabelProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode
  variant?: TypographyVariant
}