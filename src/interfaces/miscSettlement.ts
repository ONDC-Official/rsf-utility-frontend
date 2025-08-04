export interface IMiscSettlement extends Record<string, unknown> {
  id: string
  settlementReferenceNumber: string
  providerName: string
  accountNumber: string
  ifscCode: string
  amount: number
  providerAmount: number
  date: string
}

export interface IMiscSettlementForm {
  providerName: string
  accountNumber: string
  ifscCode: string
  amountToTransfer: number
} 