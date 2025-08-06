import usePost from 'hooks/usePost'

type TriggerActionName = 'settle' | 'recon' | 'on_recon' | 'report'

const useTriggerAction = (userId: string) => {
  const mutation = usePost()

  const triggerAsync = (action: TriggerActionName) =>
    mutation.mutateAsync({
      url: `/ui/trigger/${userId}/${action}`,
    })

  return { ...mutation, triggerAsync }
}

export default useTriggerAction
