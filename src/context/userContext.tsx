import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser, IUserContext } from '@interfaces/user'

const UserContext = createContext<IUserContext | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: usersData, isLoading } = useGetUsers({ enabled: true })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  const users: IUser[] = usersData?.data || []

  useEffect(() => {
    if (isLoading || selectedUser || users.length === 0) return
    setSelectedUser(users[0])
  }, [isLoading, selectedUser, users])

  const value = useMemo<IUserContext>(
    () => ({
      users,
      selectedUser,
      setSelectedUser,
      isLoading,
    }),
    [users, selectedUser, isLoading],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
