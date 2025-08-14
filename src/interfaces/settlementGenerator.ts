export interface ISettlementOrder extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  commission: number
  interNpTax: number
  bff: number
  discounts: number
  interNpSettlement: number
  provider: string
  dueDate: string
}

export interface ISettlementSummary {
  selectedOrders: number
  totalAmount: number
  batchSize: string
}

export interface ISettlementPayload extends Record<string, unknown> {
  context: {
    domain: string
    action: string
    version: string
    bap_id: string
    bpp_id: string
    timestamp: string
  }
  message: {
    settlement: {
      id: string
      orders: string[]
    }
    total_amount: number
    settlement_date: string
  }
}

export interface ISettleNpDataItem {
  order_id: string
  provider_value?: number
  self_value: number
}

export interface IGenerateNpSettlementPayload {
  settle_data: ISettleNpDataItem[]
}
