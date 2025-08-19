export enum PrepareButtonState {
  DISABLED = 'disabled',
  PREPARE = 'prepare',
  GENERATE = 'generate',
}

export const ORDER_HEADER_LABELS = {
  title: 'Orders Ready',
  subtitle: 'Select orders to prepare for settlement.',
  receiverLabel: 'Counterparty',
  prepareZero: 'Prepare (0 selected)',
  prepareWithCount: (count: number): string => `Prepare (${count} selected)`,
  generateWithCount: (count: number): string => `Generate (${count} selected)`,
}

export const TABLE_CELL_DEFAULTS = {
  ORDER_ID: 'N/A',
  COLLECTOR_ID: 'N/A',
  RECEIVER_ID: 'N/A',
  TOTAL_ORDER_VALUE: '0.00',
  COMMISSION: '0.00',
  SELLER_TYPE: 'N/A',
  DOMAIN: 'N/A',
  DUE_DATE: 'N/A',
} as const

export const CURRENCY_SYMBOL = '₹' as const
