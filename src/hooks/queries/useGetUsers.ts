import useGet from 'hooks/useGet'
import { IUser } from 'types/user'

const useGetUsers = (configs?: any) => {
  return useGet<IUser[]>('users', '/ui/users', configs)
}

export default useGetUsers
