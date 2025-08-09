export interface IOrder extends Record<string, unknown> {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  orderStatus: 'In Progress' | 'Completed' | 'Pending'
  totalOrderValue: number
  bffPercent: number
  domain: string
  dueDate: string
  msn?: boolean
  settle_status: 'RECON' | string
}

export interface OrderQueryParams {
  page?: number
  limit?: number
  status?: 'In-progress' | 'Completed'
  counterpartyId?: string
  settle_status?: Array<'RECON' | 'READY' | 'SETTLE'> | 'RECON' | 'READY' | 'SETTLE'
}
