// hooks/usePost.ts
import { useMutation, UseMutationResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

export interface IParams {
  url: string
  payload?: any
}

const post = async ({ url, payload }: IParams) => {
  const { data } = await axiosInstance.post(url, payload)
  return data
}

const usePost = (): UseMutationResult<any, unknown, IParams, unknown> => {
  return useMutation<any, unknown, IParams, unknown>(post)
}

export default usePost
