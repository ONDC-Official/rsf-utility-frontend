import { ISettlementItem } from '@interfaces/settlement'
import { ITableColumn } from 'interfaces/table'

export const columns: ITableColumn<ISettlementItem>[] = [
  { id: 'settlementReferenceNumber', label: 'Settlement Reference Number' },
  { id: 'providerName', label: 'Provider Name' },
  { id: 'accountNumber', label: 'Account Number' },
  { id: 'ifscCode', label: 'IFSC Code' },
  { id: 'amount', label: 'amount' },
  { id: 'providerAmount', label: 'Provider Amount' },
  { id: 'date', label: 'Date' },
]
