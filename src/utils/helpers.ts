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

export const humanize = (str: string | undefined | null): string => {
  if (!str || typeof str !== 'string') {
    return ''
  }

  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatSettlementStatus = (status: SettlementStatus | string | undefined | null): string => {
  if (!status) {
    return 'Unknown'
  }

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
      return humanize(status) || String(status) || 'Unknown'
  }
}

export const downloadOrdersAsCSV = (orders: any[], filename: string = 'orders.csv'): boolean => {
  try {
    if (!orders || orders.length === 0) {
      console.warn('No orders data to export')
      return false
    }

    // Define CSV headers based on the order structure

    const headers = [
      'Order ID',
      'Total Order Value',
      'Withholding Amount',
      'TDS',
      'TCS',
      'Commission',
      'Collector Settlement',

      'Collector ID',
      'Receiver ID',
      'Inter NP Settlement',
      'Provider ID',
      'Due Date',
      'Settlement Reference',
      'Status',
      'Self Status',
      'Provider Status',
      'Type',
    ]

    // order_id,total_order_value,withholding_amount, tds, tcs, commission, collector_settlement

    // Convert orders to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...orders.map((order) =>
        [
          `"${order.order_id || ''}"`,
          order.total_order_value || 0,
          order.withholding_amount || 0,
          order.tds || 0,
          order.tcs || 0,
          order.commission || 0,
          order.collector_settlement || 0,

          `"${order.collector_id || ''}"`,
          `"${order.receiver_id || ''}"`,
          order.inter_np_settlement || 0,
          `"${order.provider_id || ''}"`,
          `"${order.due_date || ''}"`,
          `"${order.settlement_reference || ''}"`,
          `"${order.status || ''}"`,
          `"${order.self_status || ''}"`,
          `"${order.provider_status || ''}"`,

          `"${order.type || ''}"`,
        ].join(','),
      ),
    ]

    const csvContent = csvRows.join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      URL.revokeObjectURL(url)
      return true
    } else {
      console.error('Download not supported in this browser')
      return false
    }
  } catch (error) {
    console.error('Error downloading CSV:', error)
    return false
  }
}
