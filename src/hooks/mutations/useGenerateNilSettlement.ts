// hooks/mutations/useGenerateNilSettlement.ts
import usePost, { IParams } from 'hooks/usePost'
import { MutateOptions } from 'react-query'

const useGenerateNilSettlement = (userId: string) => {
  const mutation = usePost()

  const trigger = (_: void, options?: MutateOptions<any, any, IParams>) =>
    mutation.mutate(
      {
        url: `/ui/generate/${userId}/settle/nil`,
        payload: { type: 'NIL' },
      },
      options,
    )

  return { ...mutation, trigger }
}

export default useGenerateNilSettlement
