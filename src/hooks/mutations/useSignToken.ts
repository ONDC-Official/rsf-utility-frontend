import { IApiResponse } from 'interfaces/api'
import usePost, { IParams } from 'hooks/usePost'
import { UseMutationResult } from 'react-query'
import { APIRoute } from 'enums/api'
import { ISignTokenPayload, ISignTokenResponse } from 'interfaces/auth'

const useSignToken = (): UseMutationResult<IApiResponse<ISignTokenResponse>, unknown, IParams, unknown> & {
  signTokenAsync: (payload: ISignTokenPayload) => Promise<IApiResponse<ISignTokenResponse>>
} => {
  const mutation = usePost<IApiResponse<ISignTokenResponse>>()

  const signTokenAsync = (payload: ISignTokenPayload): Promise<IApiResponse<ISignTokenResponse>> =>
    mutation.mutateAsync({
      url: APIRoute.SIGN_TOKEN,
      payload,
    })

  return { ...mutation, signTokenAsync }
}

export default useSignToken
