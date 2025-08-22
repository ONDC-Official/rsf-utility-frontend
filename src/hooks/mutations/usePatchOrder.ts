import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import usePatch, { IParams } from 'hooks/usePatch'
import { UseMutationResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

interface PatchOrderDueDatePayload {
  order_id: string
  due_date: string
}

interface IPatchOrderResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
}

const usePatchOrderDueDate = (
  userId: string,
): UseMutationResult<IApiResponse<IPatchOrderResponse>, unknown, IParams, unknown> & {
  patchOrderAsync: (payload: PatchOrderDueDatePayload[]) => Promise<IApiResponse<IPatchOrderResponse>>
} => {
  const mutation = usePatch<IApiResponse<IPatchOrderResponse>>()

  const patchOrderAsync = (payload: PatchOrderDueDatePayload[]): Promise<IApiResponse<IPatchOrderResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.ORDERS, { userId }),
      payload,
    })

  return { ...mutation, patchOrderAsync }
}

export default usePatchOrderDueDate
