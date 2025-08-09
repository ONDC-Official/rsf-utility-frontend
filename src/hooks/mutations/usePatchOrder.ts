import { useCallback } from 'react'
import { IApiResponse } from '@interfaces/api'
import usePatch from 'hooks/usePatch'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'

interface PatchOrderDueDatePayload {
  order_id: string
  due_date: string
}

interface UsePatchOrderDueDateOptions {
  enabled?: boolean
}

const usePatchOrderDueDate = (
  userId: string,
  options: UsePatchOrderDueDateOptions = {},
): {
  triggerAsync?: (payload: PatchOrderDueDatePayload[]) => Promise<IApiResponse<unknown>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const isEnabled = options.enabled ?? true

  const patchMutation = usePatch<IApiResponse<unknown>>()

  const triggerAsync = useCallback(
    async (payload: PatchOrderDueDatePayload[]): Promise<IApiResponse<unknown>> => {
      const url = buildApiUrl(APIRoute.ORDERS, { userId })
      return await patchMutation.mutateAsync({ url, payload })
    },
    [userId, patchMutation],
  )

  if (!isEnabled) {
    return {
      triggerAsync: undefined,
      isLoading: false,
      error: undefined,
      status: 'idle',
    }
  }

  return {
    triggerAsync,
    isLoading: patchMutation.isLoading,
    error: patchMutation.error,
    status: patchMutation.status === 'loading' ? 'loading' : patchMutation.status === 'success' ? 'success' : 'idle',
  }
}

export default usePatchOrderDueDate
