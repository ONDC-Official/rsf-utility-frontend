import { ITableColumn } from 'interfaces/table'
import { ISettlementOrder } from 'interfaces/settlementGenerator'

export const counterpartyOptions = [
  { value: 'COUNTER_001', label: 'Counterparty 001' },
  { value: 'COUNTER_002', label: 'Counterparty 002' },
]

export const columns: ITableColumn<ISettlementOrder>[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector' },
  { id: 'receiverId', label: 'Receiver' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'inter_np_settlement', label: 'Inter NP Settlement' },
  {
    id: 'commission',
    label: (
      <div style={{ lineHeight: '16px' }}>
        <div>BFF</div>
        <div>(Commission)</div>
      </div>
    ),
  },
  { id: 'tcs', label: 'TCS' },
  { id: 'tds', label: 'TDS' },
  {
    id: 'withholdingAmount',
    label: (
      <div style={{ lineHeight: '16px' }}>
        <div>Withholding</div>
        <div>(Incl. Item Tax)</div>
      </div>
    ),
  },
  { id: 'collectorSettlement', label: 'Collector Settlement' },
  { id: 'provider', label: 'Provider' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'actions', label: 'Actions' },
]
