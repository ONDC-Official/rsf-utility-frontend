export interface IPaginationProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

export enum TypographyVariant {
  Body5Regular = 'body5_regular',
}
