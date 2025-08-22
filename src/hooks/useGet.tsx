import { IApiResponse } from 'interfaces/api'
import { useQuery, UseQueryResult, UseQueryOptions, QueryKey } from 'react-query'
import axiosInstance from 'services/axiosInstance'

function useGet<TResponse = unknown>(
  key: QueryKey,
  url: string,
  configs?: UseQueryOptions<IApiResponse<TResponse>>,
): UseQueryResult<IApiResponse<TResponse>> {
  const get = async (): Promise<IApiResponse<TResponse>> => {
    const { data } = await axiosInstance.get<IApiResponse<TResponse>>(url)
    return data
  }

  const defaultConfig: UseQueryOptions<IApiResponse<TResponse>> = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }

  return useQuery<IApiResponse<TResponse>>(key, get, defaultConfig)
}

export default useGet
