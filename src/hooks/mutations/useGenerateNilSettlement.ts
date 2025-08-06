import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import usePost from 'hooks/usePost'
import { buildApiUrl } from 'utils/helpers'

const useGenerateNilSettlement = (userId: string) => {
  const mutation = usePost<IApiResponse<any>>()

  const triggerAsync = () =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.GENERATE_NIL, { userId }),
      payload: { type: 'NIL' },
    })

  return { ...mutation, triggerAsync }
}

export default useGenerateNilSettlement
