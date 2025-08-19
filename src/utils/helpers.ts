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
      return false
    }

    // Define CSV headers to match the table column display names
    const headers = [
      'Order ID',
      'Collector',
      'Receiver',
      'Total Order Value',
      'BFF',
      'Seller Type',
      'Domain',
      'Due Date',
    ]

    // Convert orders to CSV rows
    const csvRows = [
      headers.join(','), // Header row
      ...orders.map((order) =>
        [
          `"${order.order_id || order.orderId || ''}"`,
          `"${order.collector_id || order.collectorId || ''}"`,
          `"${order.receiver_id || order.receiverId || ''}"`,
          order.total_order_value || order.totalOrderValue || 0,
          order.commission || 0,
          `"${order.seller_type || order.sellerType || ''}"`,
          `"${order.domain || ''}"`,
          `"${order.due_date || order.dueDate || ''}"`,
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
      return false
    }
  } catch (error) {
    return false
  }
}

// Generic CSV download helper
const downloadCSV = (csvContent: string, filename: string): boolean => {
  try {
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
      URL.revokeObjectURL(url)
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

// Orders Progress Page Export
export const downloadOrdersProgressCSV = (orders: any[], filename: string = 'orders-progress.csv'): boolean => {
  if (!orders || orders.length === 0) return false

  const headers = [
    'Order ID',
    'Collector',
    'Receiver',
    'Order Status',
    'Total Order Value',
    'BFF',
    'Domain',
    'Due Date',
  ]

  const csvRows = [
    headers.join(','),
    ...orders.map((order) =>
      [
        `"${order.orderId || order.order_id || ''}"`,
        `"${order.collectorId || order.collector_id || ''}"`,
        `"${order.receiverId || order.receiver_id || ''}"`,
        `"${order.orderStatus || order.order_status || ''}"`,
        order.totalOrderValue || order.total_order_value || 0,
        order.bffPercent || order.commission || 0,
        `"${order.domain || ''}"`,
        `"${order.dueDate || order.due_date || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Settlement Generator Page Export
export const downloadSettlementGeneratorCSV = (
  orders: any[],
  filename: string = 'settlement-generator.csv',
): boolean => {
  if (!orders || orders.length === 0) return false

  const headers = [
    'Order ID',
    'Collector',
    'Receiver',
    'Total Order Value',
    'BFF',
    'TCS',
    'TDS',
    'Withholding',
    'Collector Settlement',
    'Provider',
    'Due Date',
  ]

  const csvRows = [
    headers.join(','),
    ...orders.map((order) =>
      [
        `"${order.order_id || order.orderId || ''}"`,
        `"${order.collector_id || order.collectorId || ''}"`,
        `"${order.receiver_id || order.receiverId || ''}"`,
        order.total_order_value || order.totalOrderValue || 0,
        order.commission || order.bffPercent || 0,
        order.tcs || 0,
        order.tds || 0,
        order.withholding_amount || order.withholdingAmount || 0,
        order.collector_settlement || order.collectorSettlement || 0,
        `"${order.provider_id || order.providerId || ''}"`,
        `"${order.due_date || order.dueDate || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Settlement Dashboard Page Export
export const downloadSettlementDashboardCSV = (
  settlements: any[],
  filename: string = 'settlement-dashboard.csv',
): boolean => {
  if (!settlements || settlements.length === 0) return false

  const headers = [
    'Order ID',
    'Collector',
    'Receiver',
    'Total Order Value',
    'Inter NP Settlement',
    'Collector Settlement',
    'Inter NP Settlement Status',
    'Self Status',
    'Provider Status',
    'Settlement Reference No.',
    'Error',
    'Settlement Initiated Date',
  ]

  const csvRows = [
    headers.join(','),
    ...settlements.map((settlement) =>
      [
        `"${settlement.order_id || settlement.orderId || ''}"`,
        `"${settlement.collector_id || settlement.collectorId || ''}"`,
        `"${settlement.receiver_id || settlement.receiverId || ''}"`,
        settlement.total_order_value || settlement.totalOrderValue || 0,
        settlement.inter_np_settlement || settlement.interNpSettlement || 0,
        settlement.commission || settlement.collectorSettlement || 0,
        `"${settlement.status || settlement.interNpSettlementStatus || ''}"`,
        `"${settlement.self_status || settlement.selfStatus || ''}"`,
        `"${settlement.provider_status || settlement.providerStatus || 'Not Applicable'}"`,
        `"${settlement.settlement_reference || settlement.settlementReference || ''}"`,
        `"${settlement.error || ''}"`,
        `"${settlement.initiated_date || settlement.initiatedDate || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Reconciliation Generate Recon Request Table Export
export const downloadReconRequestCSV = (settlements: any[], filename: string = 'recon-requests.csv'): boolean => {
  if (!settlements || settlements.length === 0) return false

  const headers = [
    'Order ID',
    'Collector',
    'Receiver',
    'Total Order Value',
    'Inter NP Settlement',
    'BFF',
    'TCS',
    'TDS',
    'Withholding',
    'Order Status',
    'Error',
  ]

  const csvRows = [
    headers.join(','),
    ...settlements.map((settlement) =>
      [
        `"${settlement.order_id || settlement.orderId || ''}"`,
        `"${settlement.collector_id || settlement.collectorId || ''}"`,
        `"${settlement.receiver_id || settlement.receiverId || ''}"`,
        settlement.total_order_value || settlement.totalOrderValue || 0,
        settlement.collector_settlement || settlement.interNpSettlement || 0,
        settlement.commission || settlement.bff || 0,
        settlement.tcs || 0,
        settlement.tds || 0,
        settlement.withholding_amount || settlement.withholdingAmount || 0,
        `"${settlement.status || settlement.orderStatus || ''}"`,
        `"${settlement.error || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Reconciliation Outgoing Requests Export
export const downloadOutgoingRequestsCSV = (requests: any[], filename: string = 'outgoing-requests.csv'): boolean => {
  if (!requests || requests.length === 0) return false

  const headers = [
    'Order ID',
    'Receiver',
    'Collector',
    'Status',
    'Due Date',
    'Initiated Date',
    'Response',
    'Actions',
    'Diff Value',
  ]

  const csvRows = [
    headers.join(','),
    ...requests.map((request) =>
      [
        `"${request.orderId || request.order_id || ''}"`,
        `"${request.receiverId || request.receiver_id || ''}"`,
        `"${request.collectorId || request.collector_id || ''}"`,
        `"${request.status || request.recon_status || ''}"`,
        `"${request.dueDate || request.due_date || request.createdAt || ''}"`,
        `"${request.initiatedDate || request.initiated_date || ''}"`,
        `"${request.response || ''}"`,
        `"${request.actions || 'N/A'}"`,
        `"${request.diffValue || request.diff_value || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Reconciliation Incoming Requests Export
export const downloadIncomingRequestsCSV = (requests: any[], filename: string = 'incoming-requests.csv'): boolean => {
  if (!requests || requests.length === 0) return false

  const headers = [
    'Recon Transaction ID',
    'Order ID',
    'Receiver',
    'Collector',
    'Status',
    'Inter NP Settlement',
    'Commission',
    'TCS',
    'TDS',
    'Withholding',
    'Received Date',
  ]

  const csvRows = [
    headers.join(','),
    ...requests.map((request) =>
      [
        `"${request.reconTransactionId || request.recon_transaction_id || ''}"`,
        `"${request.orderId || request.order_id || ''}"`,
        `"${request.receiverId || request.receiver_id || ''}"`,
        `"${request.collectorId || request.collector_id || ''}"`,
        `"${request.recon_status || request.status || ''}"`,
        request.inter_np_settlement || request.interNpSettlement || 0,
        request.commission || 0,
        request.tcs || 0,
        request.tds || 0,
        request.withholding_amount || request.withholdingAmount || 0,
        `"${request.receivedDate || request.received_date || request.createdAt || ''}"`,
      ].join(','),
    ),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}

// Misc Settlements Export
export const downloadMiscSettlementsCSV = (settlements: any[], filename: string = 'misc-settlements.csv'): boolean => {
  if (!settlements || settlements.length === 0) return false

  const headers = [
    'Settlement Reference Number',
    'Provider Name',
    'Account Number',
    'IFSC Code',
    'Amount',
    'Provider Amount',
    'Date',
  ]

  const csvRows = [
    headers.join(','),
    ...settlements.map((item) => {
      const settlement = item.request?.message?.settlement || {}
      const order = settlement.orders?.[0] || {}
      const timestamp = item.request?.context?.timestamp || ''

      return [
        `"${settlement.id || ''}"`,
        `"${order.provider?.name || order.provider?.id || ''}"`,
        `"${order.provider?.bank_details?.account_no || ''}"`,
        `"${order.provider?.bank_details?.ifsc_code || ''}"`,
        order.self?.amount?.value || 0,
        order.provider?.amount?.value || 0,
        `"${timestamp ? new Date(timestamp).toISOString().split('T')[0] : ''}"`,
      ].join(',')
    }),
  ]

  return downloadCSV(csvRows.join('\n'), filename)
}
