import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import usePost, { IParams } from 'hooks/usePost'
import { UseMutationResult } from 'react-query'
import { buildApiUrl } from 'utils/helpers'

type TriggerActionName = 'settle' | 'recon' | 'on_recon' | 'report'

interface ITriggerActionResponse {
  success: boolean
  message: string
  data?: Record<string, unknown>
}

const useTriggerAction = (
  userId: string,
): UseMutationResult<IApiResponse<ITriggerActionResponse>, unknown, IParams, unknown> & {
  triggerAsync: (action: TriggerActionName, payload?: unknown) => Promise<IApiResponse<ITriggerActionResponse>>
} => {
  const mutation = usePost<IApiResponse<ITriggerActionResponse>>()

  const triggerAsync = (action: TriggerActionName, payload?: unknown): Promise<IApiResponse<ITriggerActionResponse>> =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.TRIGGER_ACTION, { userId, action }),
      payload,
    })

  return { ...mutation, triggerAsync }
}

export default useTriggerAction
