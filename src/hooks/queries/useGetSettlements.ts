// hooks/api/useGetSettlements.ts
import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions } from 'react-query'
import { buildApiUrl } from 'utils/helpers'
import { ISettlementItem } from '@interfaces/settlement'
import { APIRoute } from 'enums/api'

const useGetSettlements = (
  page: number,
  limit: number,
  settlementType: 'MISC' | 'NP-NP' | 'NIL',
  configs?: UseQueryOptions<IApiResponse<ISettlementItem[]>>,
) => {
  const baseUrl = buildApiUrl(APIRoute.SETTLEMENTS_PAYLOAD, {})
  const url = `${baseUrl}?page=${page}&limit=${limit}&settlement_type=${settlementType}`

  return useGet<ISettlementItem[]>(`settlements-${settlementType}-${page}-${limit}`, url, {
    enabled: !!settlementType,
    ...configs,
  })
}

export default useGetSettlements
