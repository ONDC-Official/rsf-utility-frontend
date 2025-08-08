import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
  payload?: unknown
}

const patch = async <TResponse,>({ url, payload }: IParams): Promise<TResponse> => {
  const { data } = await axiosInstance.patch<TResponse>(url, payload)
  return data
}

// expose generic hook
function usePatch<TResponse = unknown>(): UseMutationResult<TResponse, unknown, IParams, unknown> {
  return useMutation<TResponse, unknown, IParams, unknown>(patch)
}

export default usePatch
