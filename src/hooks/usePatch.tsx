// hooks/usePatch.ts
import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
  payload?: any
}

const patch = async <TResponse,>({ url, payload }: IParams): Promise<TResponse> => {
  const { data } = await axiosInstance.patch<TResponse>(url, payload)
  return data
}

// expose generic hook
function usePatch<TResponse = any>(): UseMutationResult<TResponse, unknown, IParams, unknown> {
  return useMutation<TResponse, unknown, IParams, unknown>(patch)
}

export default usePatch
