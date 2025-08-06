// hooks/api/useGetSettlements.ts
import { APIRoute } from 'constants/enum'
import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

const useGetSettlements = (
  page: number,
  limit: number,
  settlementType: 'MISC' | 'NP-NP' | 'NIL',
  configs?: UseQueryOptions<IApiResponse<any>>,
) => {
  const baseUrl = buildApiUrl(APIRoute.SETTLEMENTS_PAYLOAD, {})
  const url = `${baseUrl}?page=${page}&limit=${limit}&settlement_type=${settlementType}`

  return useGet<any>(`settlements-${settlementType}-${page}-${limit}`, url, { enabled: !!settlementType, ...configs })
}

export default useGetSettlements
