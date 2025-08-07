import { ReactNode } from 'react'

export interface IOrderRow {
  orderId: ReactNode
  collectorId: ReactNode
  receiverId: ReactNode
  orderStatus: ReactNode
  totalOrderValue: number
  bffPercent: ReactNode
  dueDate: ReactNode
}
