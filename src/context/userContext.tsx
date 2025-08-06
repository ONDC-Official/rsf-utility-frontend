import React, { createContext, useState, useContext } from 'react'
import useGetUsers from 'hooks/queries/useGetUsers'
import { IUser } from 'types/user'

interface IUserContext {
  users: IUser[] | undefined
  selectedUser: IUser | null
  setSelectedUser: (user: IUser | null) => void
  isLoading: boolean
}

const UserContext = createContext<IUserContext | null>(null)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: usersData, isLoading } = useGetUsers({ enabled: true })
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

  return (
    <UserContext.Provider
      value={{
        users: usersData?.data || [],
        selectedUser,
        setSelectedUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
