import { IApiResponse } from '@interfaces/api'
import { IOrder } from 'interfaces/order'
import useGet from 'hooks/useGet'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'

interface IOrderApiResponse {
  _id: string
  order_id: string
  user_id: string
  bap_uri: string
  bpp_uri: string
  bap_id: string
  bpp_id: string
  domain: string
  provider_id: string
  state: string
  created_at: string
  updated_at: string
  collected_by: string
  msn: boolean
  settlement_counterparty: string
  buyer_finder_fee_amount: number
  buyer_finder_fee_type: string
  settlement_basis: string
  settlement_window: string
  withholding_amount: number
  settle_status: boolean
  due_date: string
  quote: {
    total_order_value: number
    breakup: Array<{
      title: string
      price: number
      id: string
      _id: string
    }>
    _id: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split('T')[0]
    }

    return date.toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

const transformOrderData = (apiOrders: IOrderApiResponse[]): IOrder[] => {
  return apiOrders.map((order) => ({
    id: order._id,
    orderId: order.order_id,
    collectorId: order.bap_id,
    receiverId: order.bpp_id,
    orderStatus: 'Pending' as const,
    totalOrderValue: order.quote?.total_order_value || 0,
    bffPercent: order.buyer_finder_fee_amount,
    domain: order.domain || '',
    dueDate: formatDate(order.due_date),
    msn: order.msn,
  }))
}

const useGetOrders = (
  userId: string,
  page: number,
  limit: number,
  status: 'In-progress' | 'Completed',
  configs?: UseQueryOptions<IApiResponse<IOrderApiResponse[]>>,
): UseQueryResult<IApiResponse<IOrder[]>> => {
  const baseUrl = buildApiUrl(APIRoute.ORDERS, { userId })
  const url = `${baseUrl}?page=${page}&limit=${limit}&status=${status}`

  const query = useGet<IOrderApiResponse[]>(`orders-${userId}-${status}-${page}-${limit}`, url, {
    enabled: !!userId && !!status,
    ...configs,
  })

  return {
    ...query,
    data: query.data
      ? {
          ...query.data,
          data: transformOrderData(query.data.data),
        }
      : undefined,
  } as UseQueryResult<IApiResponse<IOrder[]>>
}

export default useGetOrders
