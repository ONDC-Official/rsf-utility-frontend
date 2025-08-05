export interface ITableColumn<T = unknown> {
  id: string
  label: string
  sortable?: boolean
  width?: string
  icon?: React.ReactNode
  sortAscIcon?: React.ReactNode
  sortDescIcon?: React.ReactNode
}

export interface ITableProps<T extends Record<string, unknown>, SortFieldType extends string = string> {
  columns: ITableColumn<T>[]
  data: T[]
  totalCount: number
  page: number
  rowsPerPage: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSort?: (field: SortFieldType) => void
  sortField?: string
  sortDirection?: 'asc' | 'desc'
  renderHeaderContent?: () => React.ReactNode
  renderEmptyState?: () => React.ReactNode
  renderRow: (row: T, index: number) => React.ReactNode
  hideCheckboxes?: boolean
}
