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

type MiscSettlementPayload = IGenerateMiscSettlementPayload | IGenerateMiscSettlementPayload[]

const useGenerateMiscSettlement = (
  userId: string,
): UseMutationResult<IApiResponse<IMiscSettlementResponse | IMiscSettlementResponse[]>, unknown, IParams, unknown> & {
  triggerAsync: (
    payload: MiscSettlementPayload,
  ) => Promise<IApiResponse<IMiscSettlementResponse | IMiscSettlementResponse[]>>
} => {
  const mutation = usePost<IApiResponse<IMiscSettlementResponse | IMiscSettlementResponse[]>>()

  const triggerAsync = (
    payload: MiscSettlementPayload,
  ): Promise<IApiResponse<IMiscSettlementResponse | IMiscSettlementResponse[]>> => {
    return mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_MISC, { userId }),
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateMiscSettlement
