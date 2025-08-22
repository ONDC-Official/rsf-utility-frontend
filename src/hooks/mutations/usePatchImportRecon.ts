import { useCallback } from 'react'
import { IApiResponse } from 'interfaces/api'
import usePatch from 'hooks/usePatch'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'

const usePatchImportRecon = (
  userId: string,
): {
  triggerAsync: (csvFile: File) => Promise<IApiResponse<unknown>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const patchMutation = usePatch<IApiResponse<unknown>>()

  const triggerAsync = useCallback(
    async (csvFile: File): Promise<IApiResponse<unknown>> => {
      const formData = new FormData()
      formData.append('csvFile', csvFile)

      const url = buildApiUrl(APIRoute.RECON, { userId })
      return await patchMutation.mutateAsync({
        url,
        payload: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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

export default usePatchImportRecon
