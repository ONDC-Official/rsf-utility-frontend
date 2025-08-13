import React, { createContext, useContext, useEffect, useState } from 'react'
import useSignToken from 'hooks/mutations/useSignToken'
import { IApiResponse } from '@interfaces/api'
import { useToast } from 'context/toastContext'
import { TOKEN_MESSAGES } from 'constants/toastMessages'
import Loader from 'components/common/Loader'
import { AuthContextType, ISignTokenPayload, ISignTokenResponse } from 'interfaces/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const { signTokenAsync } = useSignToken()
  const toast = useToast()

  const fetchToken = async (): Promise<void> => {
    const stored = localStorage.getItem('authToken')

    if (stored) {
      setToken(stored)
      setIsAuthReady(true)
      return
    }

    const payload: ISignTokenPayload = {
      client_id: process.env.REACT_APP_CLIENT_ID!,
      expires: '1d',
    }

    try {
      const res: IApiResponse<ISignTokenResponse> = await signTokenAsync(payload)
      if (res.success && res.data?.token) {
        setToken(res.data.token)
        localStorage.setItem('authToken', res.data.token)
      }
    } catch {
      toast(TOKEN_MESSAGES.ERROR)
    } finally {
      setIsAuthReady(true)
    }
  }

  useEffect(() => {
    fetchToken()
  }, [])

  if (!isAuthReady) {
    return <Loader open />
  }

  return <AuthContext.Provider value={{ token, refreshToken: fetchToken }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return ctx
}
