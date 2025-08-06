export const RECONCILIATION_LABELS = {
  TITLE: 'Reconciliation Manager',
  SUBTITLE: 'Manage reconciliation requests for not settled orders',
  GENERATE_BUTTON: 'Generate Recon Request',
  TAB_GENERATE: 'Generate Recon Request',
  TAB_REVIEW: 'Review Recon Requests',
  RECEIVER_LABEL: 'Receiver ID',
  EXPORT: 'Export',
  FILTER_BY_DATE: 'Filter by date',
  OUTGOING_TITLE: 'Outgoing Reconciliation Requests',
  TOAST_MESSAGE: 'Reconciliation request has been generated successfully.',
  MODAL_TITLE: 'Reinitiate Reconciliation Request',
  FORM_ORDER_ID: 'Order ID',
  FORM_SETTLEMENT_AMOUNT: 'Settlement Amount',
  FORM_COMMISSION: 'Commission',
  FORM_TCS: 'TCS',
  FORM_TDS: 'TDS',
  FORM_WITHHOLDING_AMOUNT: 'Withholding Amount',
  FORM_CANCEL: 'Cancel',
  FORM_GENERATE: 'Generate Recon Request',
} as const

export const TABLE_CELL_DEFAULTS = {
  ORDER_ID: 'N/A',
  COLLECTOR_ID: 'N/A',
  RECEIVER_ID: 'N/A',
  TOTAL_VALUE: '0.00',
  SETTLEMENT_AMOUNT: '0.00',
  COMMISSION: '0.00',
} as const

export const CURRENCY_SYMBOL = '₹' as const

export const STATUS_TYPES = {
  SETTLED: 'Settled',
  NOT_SETTLED: 'Not Settled',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
} as const
