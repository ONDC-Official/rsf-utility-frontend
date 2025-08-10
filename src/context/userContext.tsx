import { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser, IUserContext } from '@interfaces/user'
import { useLoader } from 'context/loaderContext'
import { ROUTES } from 'constants/routes.constants'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext<IUserContext | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { data: usersData, isLoading, refetch } = useGetUsers({ enabled: true })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const { showLoader, hideLoader } = useLoader()
  const navigate = useNavigate()
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

  useEffect(() => {
    if (usersData?.data && usersData?.data?.length > 0 && !selectedUser) {
      setSelectedUser(usersData?.data[0])
      navigate(ROUTES.ORDERS_IN_PROGRESS)
    }
  }, [usersData])

  return (
    <UserContext.Provider
      value={{
        users: usersData?.data || [],
        selectedUser,
        setSelectedUser,
        isLoading,
        refetch,
        counterpartyIds: selectedUser?.counterparty_ids || [],
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
