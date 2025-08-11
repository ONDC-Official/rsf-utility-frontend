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
  collectorId: string
  status: 'SENT_PENDING' | 'SENT_ACCEPTED' | 'SENT_REJECTED' | 'ERROR' | string
  dueDate: string
  response: string
  error?: string
}

export interface IIncomingRequest extends Record<string, unknown> {
  id: string
  reconTransactionId: string
  orderId: string
  receiverId: string
  collectorId: string
  requestedAmount: number
  currentAmount: number
  requestedCommission: number
  currentCommission: number
  reason: string
  receivedDate: string
  recon_status: string
  withholding_amount: number
  tcs: number
  tds: number
  settlement_id: string
  payment_id: string
}
