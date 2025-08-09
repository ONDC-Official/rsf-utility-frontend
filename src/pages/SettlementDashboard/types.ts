import { IUserSettlementItem } from '@interfaces/settlement'

export interface IDashboardRowProps {
  order: IUserSettlementItem
  selected: boolean
  onCheckboxChange: (orderId: string, checked: boolean) => void
}

export interface IDashboardTableProps {
  orders: IUserSettlementItem[]
  counterpartyId: string
}

export interface IHeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (value: string) => void
}
