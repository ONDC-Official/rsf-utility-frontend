import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { SettlementQueryParams, IUserSettlementsResponse } from '@interfaces/settlement'
import { APIRoute } from 'enums/api'

const useGetUserSettlements = (
  userId: string,
  params?: SettlementQueryParams,
  configs?: UseQueryOptions<IApiResponse<IUserSettlementsResponse>>,
): UseQueryResult<IApiResponse<IUserSettlementsResponse>> => {
  const baseUrl = buildApiUrl(APIRoute.SETTLEMENT, { userId })

  const searchParams = new URLSearchParams()

  // Commented as pagination need to be fixed in the backend
  // if (params?.page) searchParams.append('page', String(params.page))
  // if (params?.limit) searchParams.append('limit', String(params.limit))

  if (params?.orderId) searchParams.append('order_id', params.orderId)
  if (params?.statuses) {
    const statusArray = Array.isArray(params.statuses) ? params.statuses : [params.statuses]
    statusArray.forEach((s) => searchParams.append('status', s))
  }

  if (params?.counterpartyId) searchParams.append('counterparty_id', params.counterpartyId)
  if (params?.dueDateFrom) searchParams.append('due_date_from', params.dueDateFrom)
  if (params?.dueDateTo) searchParams.append('due_date_to', params.dueDateTo)

  const url = searchParams.toString() ? `${baseUrl}?${searchParams.toString()}` : baseUrl

  return useGet<IUserSettlementsResponse>(['settlements-list', userId, params], url, {
    enabled: !!userId,
    ...configs,
  })
}

export default useGetUserSettlements
