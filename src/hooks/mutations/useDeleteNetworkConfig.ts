import { useCallback } from 'react'
import useDelete from 'hooks/useDelete'
import { IApiResponse } from 'interfaces/api'
import { APIRoute } from 'enums/api'
import { buildApiUrl } from 'utils/helpers'
import { IUser } from 'interfaces/user'

const useDeleteNetworkConfig = (): {
  triggerAsync: (userId: string) => Promise<IApiResponse<IUser>>
  isLoading: boolean
  error: unknown
  status: 'loading' | 'success' | 'idle'
} => {
  const deleteMutation = useDelete<IApiResponse<IUser>>()

  const triggerAsync = useCallback(
    async (userId: string): Promise<IApiResponse<IUser>> => {
      const url = buildApiUrl(`${APIRoute.USERS}/:id`, { id: userId })
      const result = await deleteMutation.mutateAsync({ url })
      return result
    },
    [deleteMutation],
  )

  return {
    triggerAsync,
    isLoading: deleteMutation.isLoading,
    error: deleteMutation.error,
    status: deleteMutation.status === 'loading' ? 'loading' : deleteMutation.status === 'success' ? 'success' : 'idle',
  }
}

export default useDeleteNetworkConfig
