import { ReactNode } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { IOrderReady } from 'interfaces/ordersReady'
import { ITableColumn } from 'interfaces/table'

export interface IOrdersReadyTableProps {
  columns: ITableColumn<IOrderReady>[]
  data: IOrderReady[]
  totalCount: number
  page: number
  rowsPerPage: number
  renderRow: (order: IOrderReady, index: number) => ReactNode
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

export interface IOrdersReadyRowProps {
  order: IOrderReady
  selected: boolean
  editedDueDates: Map<string, string>
  onCheckboxChange: (orderId: string, checked: boolean) => void
  onDueDateChange: (orderId: string, newDueDate: string) => void
}

export interface IOrdersReadyHeaderProps {
  receiverId: string
  // receiverOptions: { label: string; value: string }[]
  selectedCount: number
  prepareButtonState: 'disabled' | 'prepare' | 'generate'
  handleReceiverChange: (e: SelectChangeEvent<unknown>) => void
  handlePrepareClick: () => void
}
