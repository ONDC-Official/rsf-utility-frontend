export interface ISettlement extends Record<string, unknown> {
  id: string
  settlementId: string
  collectorId: string
  receiverId: string
  settlementStatus: 'Pending' | 'Completed' | 'Failed' | 'In Progress'
  totalAmount: number
  commissionAmount: number
  netAmount: number
  settlementDate: string
  transactionCount: number
  settlementType: 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand'
  paymentMethod: 'Bank Transfer' | 'UPI' | 'Digital Wallet'
  remarks?: string
}

export interface ISettlementSummary {
  totalSettlements: number
  totalAmount: number
  pendingAmount: number
  completedAmount: number
  failedAmount: number
  averageSettlementValue: number
  successRate: number
}

export interface ISettlementOrder {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  interNPSettlement: number
  commission: number
  status: 'Settled' | 'Not Settled'
  settlementReference: string
  error: string
  settlementInitiatedDate: string
  hasError: boolean
  errorCode?: string
  errorMessage?: string
}
