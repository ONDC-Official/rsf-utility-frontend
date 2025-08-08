import usePost, { IParams } from 'hooks/usePost'
import { IGenerateMiscSettlementPayload } from '@interfaces/miscSettlements'
import { IApiResponse } from '@interfaces/api'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'
import { UseMutationResult } from 'react-query'

interface IMiscSettlementResponse {
  settlement_id: string
  message: string
  status: string
}

const useGenerateMiscSettlement = (
  userId: string,
): UseMutationResult<IApiResponse<IMiscSettlementResponse>, unknown, IParams, unknown> & {
  triggerAsync: (payload: IGenerateMiscSettlementPayload) => Promise<IApiResponse<IMiscSettlementResponse>>
} => {
  const mutation = usePost<IApiResponse<IMiscSettlementResponse>>()

  const triggerAsync = (payload: IGenerateMiscSettlementPayload): Promise<IApiResponse<IMiscSettlementResponse>> => {
    return mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_MISC, { userId }),
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateMiscSettlement
