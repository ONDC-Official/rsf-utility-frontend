import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
}

const deleteRequest = async <TResponse,>({ url }: IParams): Promise<TResponse> => {
  const { data } = await axiosInstance.delete<TResponse>(url)
  return data
}

// expose generic hook
function useDelete<TResponse = unknown>(): UseMutationResult<TResponse, unknown, IParams, unknown> {
  return useMutation<TResponse, unknown, IParams, unknown>(deleteRequest)
}

export default useDelete
