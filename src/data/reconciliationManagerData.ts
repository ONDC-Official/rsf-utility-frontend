import { IReconciliationOrder, IOutgoingRequest } from 'interfaces/reconciliationManager'

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
    status: 'Accepted',
    dueDate: '2024-01-20',
    response: 'Accepted with revised due date',
    error: '',
  },
  {
    id: '2',
    orderId: 'ORD002',
    receiverId: 'RECV001',
    status: 'Rejected',
    dueDate: '2024-01-20',
    response: 'Accepted with revised due date',
    error: 'IGM Complaint',
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
