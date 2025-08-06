import { IApiResponse } from '@interfaces/api'
import { APIRoute } from 'enums/api'
import usePost from 'hooks/usePost'
import { buildApiUrl } from 'utils/helpers'

type TriggerActionName = 'settle' | 'recon' | 'on_recon' | 'report'

const useTriggerAction = (userId: string) => {
  const mutation = usePost<IApiResponse<any>>()

  const triggerAsync = (action: TriggerActionName, payload?: any) =>
    mutation.mutateAsync({
      url: buildApiUrl(APIRoute.TRIGGER_ACTION, { userId, action }),
      payload,
    })

  return { ...mutation, triggerAsync }
}

export default useTriggerAction
