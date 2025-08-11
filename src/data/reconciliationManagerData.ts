import { IReconciliationOrder, IOutgoingRequest, IIncomingRequest } from 'interfaces/reconciliationManager'

export const reconciliationData: IReconciliationOrder[] = [
  {
    id: '1',
    orderId: 'ORD001',
    collectorId: 'COLL001',
    totalValue: 1500.0,
    settlementAmount: 1173.0,
    commission: 150.0,
    orderStatus: 'Not Settled',
    error: 'Settlement API Timeout',
  },
  {
    id: '2',
    orderId: 'ORD002',
    collectorId: 'COLL001',
    totalValue: 1200.0,
    settlementAmount: 1173.0,
    commission: 150.0,
    orderStatus: 'Not Settled',
    error: 'Invalid Bank Details',
  },
]

export const outgoingRequestData: IOutgoingRequest[] = [
  {
    id: '1',
    orderId: 'ORD001',
    receiverId: 'RECV001',
    collectorId: 'COLLV001',
    status: 'Accepted',
    dueDate: '2024-01-20',
    response: 'Accepted with revised due date',
    error: '',
  },
  {
    id: '2',
    orderId: 'ORD002',
    receiverId: 'RECV001',
    collectorId: 'COLLV001',
    status: 'Rejected',
    dueDate: '2024-01-20',
    response: 'Accepted with revised due date',
    error: 'IGM Complaint',
  },
]

export const incomingRequestData: IIncomingRequest[] = [
  {
    id: '1',
    reconTransactionId: 'RECT001',
    orderId: 'ORD001',
    receiverId: 'RECV001',
    collectorId: 'COLLV001',
    requestedAmount: 1200.0,
    currentAmount: 1250.0,
    requestedCommission: 120.0,
    currentCommission: 125.0,
    reason: 'Commission rate disagreement due to policy changes',
    receivedDate: '2024-01-20',
    recon_status: 'RECEIVED_PENDING',
    withholding_amount: 50.0,
    tcs: 15.0,
    tds: 20.0,
    settlement_id: 'SETT001',
    payment_id: 'PAY001',
  },
  {
    id: '2',
    reconTransactionId: 'RECT002',
    orderId: 'ORD002',
    receiverId: 'RECV001',
    collectorId: 'COLLV001',
    requestedAmount: 1100.0,
    currentAmount: 1150.0,
    requestedCommission: 110.0,
    currentCommission: 115.0,
    reason: 'Settlement amount mismatch',
    receivedDate: '2024-01-20',
    recon_status: 'RECEIVED_PENDING',
    withholding_amount: 45.0,
    tcs: 12.0,
    tds: 18.0,
    settlement_id: 'SETT002',
    payment_id: 'PAY002',
  },
]

export const generateReconciliationData = (count: number): IReconciliationOrder[] => {
  const baseData = [...reconciliationData]
  const generatedData: IReconciliationOrder[] = []

  const errorMessages = ['Settlement API Timeout', 'Invalid Bank Details', 'Insufficient balance', 'Network error']

  for (let i = 0; i < count; i++) {
    const baseOrder = baseData[i % baseData.length]

    generatedData.push({
      ...baseOrder,
      id: `recon-order-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
      error: i % 3 === 0 ? errorMessages[i % errorMessages.length] : undefined,
    })
  }

  return generatedData
}

export const generateOutgoingRequests = (count: number): IOutgoingRequest[] => {
  const baseData = [...outgoingRequestData]
  const generatedData: IOutgoingRequest[] = []

  for (let i = 0; i < count; i++) {
    const baseRequest = baseData[i % baseData.length]

    generatedData.push({
      ...baseRequest,
      id: `outgoing-request-${i + 1}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
    })
  }

  return generatedData
}

export const generateIncomingRequests = (count: number): IIncomingRequest[] => {
  const baseData = [...incomingRequestData]
  const generatedData: IIncomingRequest[] = []

  const reasons = [
    'Commission rate disagreement due to policy changes',
    'Settlement amount mismatch',
    'Invalid Bank Details provided by merchant',
    'Tax calculation differences',
  ]

  const statuses = ['RECEIVED_PENDING', 'RECEIVED_ACCEPTED', 'RECEIVED_REJECTED']

  for (let i = 0; i < count; i++) {
    const baseRequest = baseData[i % baseData.length]

    generatedData.push({
      ...baseRequest,
      id: `incoming-request-${i + 1}`,
      reconTransactionId: `RECT${String(i + 1).padStart(3, '0')}`,
      orderId: `ORD${String(i + 1).padStart(3, '0')}`,
      reason: reasons[i % reasons.length],
      recon_status: statuses[i % statuses.length],
      settlement_id: `SETT${String(i + 1).padStart(3, '0')}`,
      payment_id: `PAY${String(i + 1).padStart(3, '0')}`,
      withholding_amount: Math.round((Math.random() * 100 + 20) * 100) / 100,
      tcs: Math.round((Math.random() * 30 + 10) * 100) / 100,
      tds: Math.round((Math.random() * 30 + 15) * 100) / 100,
    })
  }

  return generatedData
}
