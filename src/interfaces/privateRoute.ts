import { ReactElement } from 'react'

export interface IPrivateRouteProps {
  children: ReactElement
  isAuthenticated?: boolean
}
