// hooks/usePost.ts
import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
  payload?: unknown
}

const post = async <TResponse,>({ url, payload }: IParams): Promise<TResponse> => {
  const { data } = await axiosInstance.post<TResponse>(url, payload)
  return data
}

// expose generic hook
function usePost<TResponse = unknown>(): UseMutationResult<TResponse, unknown, IParams, unknown> {
  return useMutation<TResponse, unknown, IParams, unknown>(post)
}

export default usePost
