export const DASHBOARD_LABELS = {
  TITLE: 'Settlement Dashboard',
  SUBTITLE: 'Monitor settlement status and manage reconciliation',
  COUNTERPARTY_LABEL: 'Counterparty ID',
  CHOOSE_PLACEHOLDER: 'Choose...',
  FILTER_BY_DATE: 'Filter by date',
  EXPORT: 'Export',
} as const

export const TABLE_CELL_DEFAULTS = {
  ORDER_ID: 'N/A',
  COLLECTOR_ID: 'N/A',
  RECEIVER_ID: 'N/A',
  TOTAL_ORDER_VALUE: '0.00',
  INTER_NP_SETTLEMENT: '0.00',
  COMMISSION: '0.00',
} as const

export const CURRENCY_SYMBOL = '₹' as const

export const STATUS_TYPES = {
  SETTLED: 'Settled',
  NOT_SETTLED: 'Not Settled',
} as const
