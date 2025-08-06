// hooks/api/useGetSettlements.ts
import { IApiResponse } from '@interfaces/api'
import useGet from 'hooks/useGet'
import { UseQueryOptions } from 'react-query'

const useGetSettlements = (
  page: number,
  limit: number,
  settlementType: 'MISC' | 'NP-NP' | 'NIL',
  configs?: UseQueryOptions<IApiResponse<any>>,
) => {
  return useGet<any>(
    `settlements-${settlementType}-${page}-${limit}`,
    `/ui/rsf-payloads/?page=${page}&limit=${limit}&settlement_type=${settlementType}`,
    { enabled: !!settlementType, ...configs },
  )
}

export default useGetSettlements
