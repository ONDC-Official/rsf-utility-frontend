// hooks/mutations/useTriggerAction.ts
import usePost, { IParams } from 'hooks/usePost'
import { MutateOptions } from 'react-query'

type TriggerActionName = 'settle' | 'recon' | 'on_recon' | 'report'

const useTriggerAction = (userId: string) => {
  const mutation = usePost()

  const trigger = (action: TriggerActionName, options?: MutateOptions<any, any, IParams>) =>
    mutation.mutate(
      {
        url: `/ui/trigger/${userId}/${action}`,
      },
      options,
    )

  return { ...mutation, trigger }
}

export default useTriggerAction
