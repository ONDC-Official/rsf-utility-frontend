import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import usePost, { IParams } from 'hooks/usePost'
import { buildApiUrl } from 'utils/helpers'
import { UseMutationResult } from 'react-query'

interface INilSettlementResponse {
  settlement_id: string
  message: string
  status: string
}

const useGenerateNilSettlement = (
  userId: string,
): UseMutationResult<IApiResponse<INilSettlementResponse>, unknown, IParams, unknown> & {
  triggerAsync: () => Promise<IApiResponse<INilSettlementResponse>>
} => {
  const mutation = usePost<IApiResponse<INilSettlementResponse>>()

  const triggerAsync = (): Promise<IApiResponse<INilSettlementResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_NIL, { userId }),
      payload: { type: 'NIL' },
    })

  return { ...mutation, triggerAsync }
}

export default useGenerateNilSettlement
