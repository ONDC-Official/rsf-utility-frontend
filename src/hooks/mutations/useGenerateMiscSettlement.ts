import usePost from 'hooks/usePost'
import { IGenerateMiscSettlementPayload } from '@interfaces/miscSettlements'

const useGenerateMiscSettlement = (userId: string) => {
  const mutation = usePost()

  const triggerAsync = (payload: IGenerateMiscSettlementPayload) => {
    return mutation.mutateAsync({
      url: `/ui/generate/${userId}/settle/misc`,
      payload,
    })
  }

  return { ...mutation, triggerAsync }
}

export default useGenerateMiscSettlement
