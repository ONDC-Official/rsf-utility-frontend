import { ReactNode } from 'react'

export interface IOrderRow {
  orderId: ReactNode
  collectorId: ReactNode
  receiverId: ReactNode
  orderStatus: string
  totalOrderValue: number
  bffPercent: ReactNode
  dueDate: ReactNode
  domain: string
}
