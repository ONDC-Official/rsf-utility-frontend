import usePost from 'hooks/usePost'
import { IGenerateMiscSettlementPayload } from '@interfaces/miscSettlements'
import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'constants/enum'
import { buildApiUrl } from 'utils/helpers'

const useGenerateMiscSettlement = (userId: string) => {
  const mutation = usePost<IApiResponse<any>>()

  const triggerAsync = (payload: IGenerateMiscSettlementPayload) => {
    return mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_MISC, { userId }),
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateMiscSettlement
