import useGet from 'hooks/useGet'
import { IUser } from '@interfaces/user'
import { UseQueryOptions } from 'react-query'
import { IApiResponse } from '@interfaces/api'
import { buildApiUrl } from 'utils/helpers'
import { APIRoute } from 'constants/enum'

const useGetUsers = (configs?: UseQueryOptions<IApiResponse<IUser[]>>) => {
  return useGet<IUser[]>('users', buildApiUrl(APIRoute.USERS, {}), configs)
}

export default useGetUsers
