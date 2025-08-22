import usePost from 'hooks/usePost'
import { IApiResponse } from 'interfaces/api'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'
import { IGenerateNpSettlementPayload } from 'interfaces/settlementGenerator'

interface INpSettlementResponse {
  settlement_id: string
  message: string
  status: string
}

const useGenerateNpSettlement = (
  userId: string,
): {
  triggerAsync: (payload: IGenerateNpSettlementPayload) => Promise<IApiResponse<INpSettlementResponse>>
} => {
  const mutation = usePost<IApiResponse<INpSettlementResponse>>()

  const triggerAsync = (payload: IGenerateNpSettlementPayload): Promise<IApiResponse<INpSettlementResponse>> => {
    return mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_NP_NP, { userId }),
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateNpSettlement
