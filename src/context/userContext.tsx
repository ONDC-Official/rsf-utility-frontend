import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser, IUserContext } from '@interfaces/user'

const UserContext = createContext<IUserContext | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: usersData, isLoading, refetch } = useGetUsers({ enabled: true })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const users: IUser[] = usersData?.data || []

  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      setSelectedUser(users[0])
    }
  }, [isLoading, selectedUser, users])

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
