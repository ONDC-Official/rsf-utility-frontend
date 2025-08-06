import { ISettlementDashboardOrder } from 'interfaces/settlementDashboard'

export interface IDashboardRowProps {
  order: ISettlementDashboardOrder
  selected: boolean
  onCheckboxChange: (orderId: string, checked: boolean) => void
}

export interface IDashboardTableProps {
  orders: ISettlementDashboardOrder[]
}

export interface IHeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (value: string) => void
}
