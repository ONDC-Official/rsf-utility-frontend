import { TypographyVariant } from './typography'

export const TableCellStyles = {
  DEFAULT: {
    typography: TypographyVariant.Body2Regular,
    color: 'text.tertiary',
  },
} as const

export type ITableCellStyle = typeof TableCellStyles[keyof typeof TableCellStyles]
