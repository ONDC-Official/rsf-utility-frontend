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
