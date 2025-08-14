import useGet from 'hooks/useGet'
import { IUser } from '@interfaces/user'
import { UseQueryOptions, UseQueryResult } from 'react-query'
import { IApiResponse } from '@interfaces/api'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'enums/api'

const useGetUsers = (configs?: UseQueryOptions<IApiResponse<IUser[]>>): UseQueryResult<IApiResponse<IUser[]>> => {
  return useGet<IUser[]>('users', buildApiUrl(APIRoute.USERS, {}), configs)
}

export default useGetUsers
