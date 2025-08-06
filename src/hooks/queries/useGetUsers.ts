import useGet from 'hooks/useGet'
import { IUser } from '@interfaces/user'
import { UseQueryOptions } from 'react-query'
import { IApiResponse } from '@interfaces/api'

const useGetUsers = (configs?: UseQueryOptions<IApiResponse<IUser[]>>) => {
  return useGet<IUser[]>('users', '/ui/users', configs)
}

export default useGetUsers
