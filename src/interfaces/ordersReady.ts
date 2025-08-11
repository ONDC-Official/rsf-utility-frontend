export interface IOrderReady extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  commission: number
  sellerType: string
  domain: string
  dueDate: string | null
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
  prepare_data: Array<{
    id: string
    strategy: string
  }>
}

export interface ISettlePrepareResponse {
  success: boolean
  errorCode?: string
  message: string
  details?: {
    error?: string
  }
}
