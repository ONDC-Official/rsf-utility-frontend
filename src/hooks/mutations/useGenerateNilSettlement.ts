import usePost from 'hooks/usePost'

const useGenerateNilSettlement = (userId: string) => {
  const mutation = usePost()

  const triggerAsync = () =>
    mutation.mutateAsync({
      url: `/ui/generate/${userId}/settle/nil`,
      payload: { type: 'NIL' },
    })

  return { ...mutation, triggerAsync }
}

export default useGenerateNilSettlement
