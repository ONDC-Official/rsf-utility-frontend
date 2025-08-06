export interface IReconciliationOrder extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  totalValue: number
  settlementAmount: number
  commission: number
  orderStatus: 'Settled' | 'Not Settled'
  error?: string
}

export interface IOutgoingRequest extends Record<string, unknown> {
  id: string
  orderId: string
  receiverId: string
  status: 'Accepted' | 'Rejected'
  dueDate: string
  response: string
  error?: string
}
