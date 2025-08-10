import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
  payload?: unknown
  headers?: Record<string, string>
}

const patch = async <TResponse,>({ url, payload, headers }: IParams): Promise<TResponse> => {
  const { data } = await axiosInstance.patch<TResponse>(url, payload, headers ? { headers } : undefined)
  return data
}

// expose generic hook
function usePatch<TResponse = unknown>(): UseMutationResult<TResponse, unknown, IParams, unknown> {
  return useMutation<TResponse, unknown, IParams, unknown>(patch)
}

export default usePatch
