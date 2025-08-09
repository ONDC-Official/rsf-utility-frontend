import { SettlementStatus } from 'enums/settlement'

export const buildApiUrl = (route: string, params: Record<string, string | number>): string =>
  Object.keys(params).reduce((acc, key) => {
    const value = String(params[key])
    return acc.replace(`{${key}}`, value).replace(new RegExp(`:${key}\\b`, 'g'), value)
  }, route)

export const formatCurrency = (value: number | null | undefined, decimals = 2): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '-' // or '0.00', or whatever fallback you prefer
  }

  return `₹${value.toFixed(decimals)}`
}

export const humanize = (str: string) =>
  str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const formatSettlementStatus = (status: SettlementStatus | string): string => {
  switch (status) {
    case SettlementStatus.PENDING:
      return 'Pending'
    case SettlementStatus.PREPARED:
      return 'Prepared'
    case SettlementStatus.SETTLED:
      return 'Settled'
    case SettlementStatus.NOT_SETTLED:
      return 'Not Settled'
    // Recon status cases
    case 'SENT_PENDING':
      return 'Pending'
    case 'SENT_ACCEPTED':
      return 'Accepted'
    case 'SENT_REJECTED':
      return 'Rejected'
    case 'RECEIVED_PENDING':
      return 'Pending'
    case 'RECEIVED_ACCEPTED':
      return 'Accepted'
    case 'RECEIVED_REJECTED':
      return 'Rejected'
    case 'ERROR':
      return 'Error'
    default:
      return humanize(status) || status
  }
}
