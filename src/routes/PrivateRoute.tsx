import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { PrivateRouteProps } from 'interfaces/privateRoute'
import { ROUTES } from 'constants/routes.constants'

const PrivateRoute: FC<PrivateRouteProps> = ({ children, isAuthenticated = true }) =>
  isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />

export default PrivateRoute
