import { ITableColumn } from 'interfaces/table'

export const columns: ITableColumn[] = [
  { id: 'orderId', label: 'Order ID' },
  { id: 'collectorId', label: 'Collector ID' },
  { id: 'receiverId', label: 'Receiver ID' },
  { id: 'totalOrderValue', label: 'Total Order Value' },
  { id: 'interNpSettlement', label: 'Inter NP Settlement' },
  { id: 'commission', label: 'Commission' },
  { id: 'interNpSettlementStatus', label: 'Inter NP Settlement Status' },
  { id: 'selfStatus', label: 'Self Status' },
  { id: 'providerStatus', label: 'Provider Status' },
  { id: 'settlementReference', label: 'Settlement Reference No.' },
  { id: 'error', label: 'Error' },
  { id: 'settlementInitiatedDate', label: 'Settlement Initiated Date' },
  { id: 'actions', label: 'Actions' },
]
