import { SettlementStatus } from 'enums/settlement'

export interface ISettlement extends Record<string, unknown> {
  id: string
  settlementId: string
  collectorId: string
  receiverId: string
  settlementStatus: 'Pending' | 'Completed' | 'Failed' | 'In Progress'
  totalAmount: number
  commissionAmount: number
  netAmount: number
  settlementDate: string
  transactionCount: number
  settlementType: 'Daily' | 'Weekly' | 'Monthly' | 'On-Demand'
  paymentMethod: 'Bank Transfer' | 'UPI' | 'Digital Wallet'
  remarks?: string
}

export interface ISettlementSummary {
  totalSettlements: number
  totalAmount: number
  pendingAmount: number
  completedAmount: number
  failedAmount: number
  averageSettlementValue: number
  successRate: number
}

export interface ISettlementOrder {
  id: string
  orderId: string
  collectorId: string
  receiverId: string
  totalOrderValue: number
  interNPSettlement: number
  commission: number
  status: 'Settled' | 'Not Settled'
  settlementReference: string
  error: string
  settlementInitiatedDate: string
  hasError: boolean
  errorCode?: string
  errorMessage?: string
}

// interfaces/settlements.ts

export interface ISettlementItem {
  _id: string
  request: {
    context: {
      domain: string
      location: {
        country: { code: string }
        city: { code: string }
      }
      version: string
      action: string
      bap_id: string
      bap_uri: string
      bpp_id: string
      bpp_uri: string
      transaction_id: string
      message_id: string
      timestamp: string
      ttl: string
    }
    message: {
      settlement: {
        type: string
        id: string
        orders: Array<{
          provider: {
            id: string
            name: string
            bank_details: {
              account_no: string
              ifsc_code: string
            }
            amount: {
              currency: string
              value: string
            }
          }
          self: {
            amount: {
              currency: string
              value: string
            }
          }
        }>
      }
    }
  }
  response: {
    statusCode: string
    data: {
      success: boolean
      message: string
      data?: {
        message?: {
          ack?: {
            status: string
          }
        }
        code?: string
        request?: {
          method: string
          url: string
        }
        response?: {
          status: number
          statusText: string
          data: string
        }
      }
      errorCode?: string
      details?: {
        error?: string
        errors?: string
      }
    }
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IUserSettlementItem {
  id: string
  order_id: string
  user_id: string
  collector_id: string
  receiver_id: string
  settlement_id: string
  total_order_value: number
  commission: number
  tax: number
  withholding_amount: number
  inter_np_settlement: number
  provider_id: string
  due_date: string
  settlement_reference: string
  error: string
  status: SettlementStatus
  self_status: string
  provider_status: string
  collector_settlement: number
  type: string
  context: {
    domain: string
    location: {
      country: { code: string }
      city: { code: string }
    }
    version: string
    action: string
    bap_id: string
    bap_uri: string
    bpp_id: string
    bpp_uri: string
    transaction_id: string
    message_id: string
    timestamp: string
    ttl: string
  }
  reconInfo: {
    recon_status: string
    amount: number
    commission: number
    withholding_amount: number
    tcs: number
    tds: number
  }
}

export interface SettlementQueryParams {
  page?: number
  orderId?: string
  limit?: number
  statuses?: SettlementStatus[] | SettlementStatus
  counterpartyId?: string
  dueDateFrom?: string
  dueDateTo?: string
}

export interface SettlementPayload {
  order_id: string
  total_order_value: number
  commission: number
  collector_settlement: number
  tds: number
  tcs: number
  withholding_amount: number
  inter_np_settlement: number
}

export interface IUserSettlementsResponse {
  settlements: IUserSettlementItem[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
