import { IApiResponse } from '@interfaces/api'
import { useQuery, UseQueryResult } from 'react-query'
import axiosInstance from 'services/axiosInstance'

function useGet<TResponse = any>(key: string, url: string, configs?: any): UseQueryResult<IApiResponse<TResponse>> {
  const get = async () => {
    const { data } = await axiosInstance.get<IApiResponse<TResponse>>(url)
    return data
  }

  const defaultConfig = {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    ...configs,
  }

  return useQuery<IApiResponse<TResponse>>(key, get, defaultConfig)
}

export default useGet
