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

export type PrepareButtonState = 'disabled' | 'prepare' | 'generate'
