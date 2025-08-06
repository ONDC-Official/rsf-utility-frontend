// hooks/api/useGetSettlements.ts
import useGet from 'hooks/useGet'

const useGetSettlements = (page: number, limit: number, settlementType: 'MISC' | 'NP-NP' | 'NIL', configs?: any) => {
  return useGet<any>(
    `settlements-${settlementType}-${page}-${limit}`,
    `/ui/rsf-payloads/?page=${page}&limit=${limit}&settlement_type=${settlementType}`,
    { enabled: !!settlementType, ...configs },
  )
}

export default useGetSettlements
