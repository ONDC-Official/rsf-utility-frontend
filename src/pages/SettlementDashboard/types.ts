import { IUserSettlementItem } from '@interfaces/settlement'
import { IDateRange } from 'components/common/DateRangePickerButton/types'

export interface IDashboardRowProps {
  order: IUserSettlementItem
  selected: boolean
  onCheckboxChange: (orderId: string, checked: boolean) => void
}

export interface IDashboardTableProps {
  orders: IUserSettlementItem[]
  counterpartyId: string
  onDateRangeChange?: (dateRange: IDateRange) => void
  dateRange?: IDateRange
  onExport?: () => void
}

export interface IHeaderSectionProps {
  counterpartyId: string
  onCounterpartyChange: (value: string) => void
}
