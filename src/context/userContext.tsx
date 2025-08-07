import { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser, IUserContext } from '@interfaces/user'
import { useLoader } from 'context/loaderContext'

const UserContext = createContext<IUserContext | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { data: usersData, isLoading, refetch } = useGetUsers({ enabled: true })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { showLoader, hideLoader } = useLoader()

  const [initialLoadHandled, setInitialLoadHandled] = useState(false)

  useEffect(() => {
    if (!initialLoadHandled) {
      if (isLoading) {
        showLoader()
      } else {
        hideLoader()
        setInitialLoadHandled(true)
      }
    }
  }, [isLoading, initialLoadHandled, showLoader, hideLoader])

  return (
    <UserContext.Provider
      value={{
        users: usersData?.data || [],
        selectedUser,
        setSelectedUser,
        isLoading,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
