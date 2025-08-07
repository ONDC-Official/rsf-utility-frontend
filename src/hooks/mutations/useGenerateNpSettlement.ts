import usePost from 'hooks/usePost'
import { IApiResponse } from '@interfaces/api'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'
import { IGenerateNpSettlementPayload } from 'interfaces/settlementGenerator'

const useGenerateNpSettlement = (userId: string) => {
  const mutation = usePost<IApiResponse<any>>()

  const triggerAsync = (payload: IGenerateNpSettlementPayload) => {
    return mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_NP_NP, { userId }),
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateNpSettlement
