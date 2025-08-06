import { MutateOptions } from 'react-query'
import usePost from 'hooks/usePost'
import { IGenerateMiscSettlementPayload } from '@interfaces/miscSettlements'
import { IParams } from '@interfaces/api'

const useGenerateMiscSettlement = (userId: string) => {
  const mutation = usePost()

  const trigger = (payload: IGenerateMiscSettlementPayload, options?: MutateOptions<any, any, IParams>) =>
    mutation.mutate(
      {
        url: `/ui/generate/${userId}/settle/misc`,
        payload,
      },
      options,
    )

  return { ...mutation, trigger }
}

export default useGenerateMiscSettlement
