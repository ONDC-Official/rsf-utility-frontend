import { ReactElement } from 'react'

export interface PrivateRouteProps {
  children: ReactElement
  isAuthenticated?: boolean
}
