import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import usePost, { IParams } from 'hooks/usePost'
import { UseMutationResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

export interface IMoveToReadyPayload {
  orders: Array<{
    order_id: string
  }>
}

export interface IMoveToReadyResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
}

const useMoveToReady = (
  userId: string,
): UseMutationResult<IApiResponse<IMoveToReadyResponse>, unknown, IParams, unknown> & {
  moveToReadyAsync: (payload: IMoveToReadyPayload) => Promise<IApiResponse<IMoveToReadyResponse>>
} => {
  const mutation = usePost<IApiResponse<IMoveToReadyResponse>>()

  const moveToReadyAsync = (payload: IMoveToReadyPayload): Promise<IApiResponse<IMoveToReadyResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.MOVE_TO_READY, { userId }),
      payload,
    })

  return { ...mutation, moveToReadyAsync }
}

export default useMoveToReady
