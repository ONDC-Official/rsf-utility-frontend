export interface IOrderReady extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  commission: number
  sellerType: string
  dueDate: string
}

export interface IToastState {
  isVisible: boolean
  message: string
  count: number
}

export enum PrepareButtonState {
  DISABLED = 'disabled',
  PREPARE = 'prepare',
  GENERATE = 'generate',
}

export interface ISettlePrepareRequest {
  order_ids: string[]
}

export interface ISettlePrepareResponse {
  success: boolean
  errorCode?: string
  message: string
  details?: {
    error?: string
  }
}
