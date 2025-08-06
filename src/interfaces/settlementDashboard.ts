export interface ISettlementDashboardOrder extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  interNpSettlement: number
  commission: number
  interNpSettlementStatus: 'Settled' | 'Not Settled'
  selfStatus: 'Settled' | 'Not Settled'
  providerStatus: 'Settled' | 'Not Settled'
}
