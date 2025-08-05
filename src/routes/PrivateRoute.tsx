import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { PrivateRouteProps } from '@interfaces/privateRoute'

const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuthenticated = true }) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute
