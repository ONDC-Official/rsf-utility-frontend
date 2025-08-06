import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'

export interface IDashboardRowProps {
  order: ISettlementDashboardOrder
  selected: boolean
  onCheckboxChange: (orderId: string, checked: boolean) => void
}

export interface IDashboardTableProps {
  orders: ISettlementDashboardOrder[]
  totalCount: number
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  selectedOrders: Set<string>
  onCheckboxChange: (id: string, checked: boolean) => void
  onSelectAll: (checked: boolean, currentPageItems: ISettlementDashboardOrder[]) => void
}

export interface IHeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (value: string) => void
}
