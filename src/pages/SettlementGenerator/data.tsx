import { ITableColumn } from 'interfaces/table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'

export const counterpartyOptions = [
  { value: 'COUNTER_001', label: 'Counterparty 001' },
  { value: 'COUNTER_002', label: 'Counterparty 002' },
]

export const columns: ITableColumn<ISettlementOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'commission', label: 'BFF (Commission)' },
  { id: 'tcs', label: 'TCS' },
  { id: 'tds', label: 'TDS' },
  { id: 'withholdingAmount', label: 'Withholding (Incl. Item Tax)' },
  { id: 'collectorSettlement', label: 'Collector Settlement' },
  { id: 'provider', label: 'Provider' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'actions', label: 'Actions' },
]
