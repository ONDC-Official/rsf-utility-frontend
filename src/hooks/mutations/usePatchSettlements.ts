import { useCallback } from 'react'
import { IApiResponse } from '@interfaces/api'
import usePatch from 'hooks/usePatch'
import { APIRoute } from 'enums/api'
import { SettlementPayload } from '@interfaces/settlement'
import { buildApiUrl } from 'utils/helpers'

interface PatchSettlementsPayload {
  settlements: SettlementPayload[]
}

const usePatchSettlements = (
  userId: string,
): {
  triggerAsync: (payload: PatchSettlementsPayload) => Promise<IApiResponse<unknown>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const patchMutation = usePatch<IApiResponse<unknown>>()

  const triggerAsync = useCallback(
    async (payload: PatchSettlementsPayload): Promise<IApiResponse<unknown>> => {
      const url = buildApiUrl(APIRoute.SETTLEMENT, { userId })
      return await patchMutation.mutateAsync({ url, payload })
    },
    [userId, patchMutation],
  )

  return {
    triggerAsync,
    isLoading: patchMutation.isLoading,
    error: patchMutation.error,
    status: patchMutation.status === 'loading' ? 'loading' : patchMutation.status === 'success' ? 'success' : 'idle',
  }
}

export default usePatchSettlements
