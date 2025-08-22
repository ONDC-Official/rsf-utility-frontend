import { FC, createContext, useContext, useEffect, useState, ReactNode } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser, IUserContext } from 'interfaces/user'
import { useLoader } from 'context/loaderContext'
import { LOCAL_STORAGE_KEY } from 'constants/user'

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

  useEffect(() => {
    if (isLoading) return

    const users = usersData?.data || []

    if (users.length === 0) {
      setSelectedUser(null)
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      return
    }

    const savedUserId = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!selectedUser) {
      if (savedUserId) {
        const savedUser = users.find((u) => u._id === savedUserId)
        if (savedUser) {
          setSelectedUser(savedUser)
          return
        }
      }

      setSelectedUser(users[users?.length - 1])
    }
  }, [usersData, selectedUser])

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedUser._id)
    }
  }, [selectedUser])

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
