import { IApiResponse } from '@interfaces/api'
import { IOrder, OrderQueryParams } from 'interfaces/order'
import useGet from 'hooks/useGet'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'
import { formatDate } from 'utils/formatters'

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
  settle_status: 'RECON' | string
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

const transformOrderData = (apiOrders: IOrderApiResponse[]): IOrder[] => {
  return apiOrders.map((order) => ({
    id: order._id,
    orderId: order.order_id,
    collectorId: order.bap_id,
    receiverId: order.bpp_id,
    orderStatus: 'In Progress' as const,
    totalOrderValue: order.quote?.total_order_value || 0,
    bffPercent: order.buyer_finder_fee_amount,
    domain: order.domain || '',
    dueDate: order.due_date ? formatDate(order.due_date) : null,
    msn: order.msn,
    settle_status: order.settle_status,
  }))
}

const useGetOrders = (
  userId: string,
  params?: OrderQueryParams,
  configs?: UseQueryOptions<IApiResponse<IOrderApiResponse[]>>,
): UseQueryResult<IApiResponse<IOrder[]>> => {
  const baseUrl = buildApiUrl(APIRoute.ORDERS, { userId })

  const searchParams = new URLSearchParams()

  if (params?.page) searchParams.append('page', String(params.page))
  if (params?.limit) searchParams.append('limit', String(params.limit))
  if (params?.status) searchParams.append('state', params.status)
  if (params?.counterpartyId) searchParams.append('counterparty_id', params.counterpartyId)
  if (params?.settle_status) {
    const statusArray = Array.isArray(params.settle_status) ? params.settle_status : [params.settle_status]
    statusArray.forEach((s) => searchParams.append('settle_status', s))
  }

  const url = searchParams.toString() ? `${baseUrl}?${searchParams}` : baseUrl

  const query = useGet<IOrderApiResponse[]>(['orders', userId, params], url, {
    enabled: !!userId && !!params?.status,
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
