import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { IUserSettlementItem } from '@interfaces/settlement'
import { APIRoute } from 'enums/api'

const useGetUserSettlements = (
  userId: string,
  page: number,
  limit: number,
  status: 'PREPARED' | 'COMPLETED' | 'FAILED' | string,
  configs?: UseQueryOptions<IApiResponse<IUserSettlementItem[]>>,
) => {
  const baseUrl = buildApiUrl(APIRoute.SETTLEMENTS_LIST, { userId })
  const url = `${baseUrl}?status=${status}`

  return useGet<IUserSettlementItem[]>(`settlements-list-${userId}-${status}-${page}-${limit}`, url, {
    enabled: !!userId && !!status,
    ...configs,
  })
}

export default useGetUserSettlements
