import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { IPrivateRouteProps } from 'interfaces/privateRoute'
import { ROUTES } from 'constants/routes.constants'

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, isAuthenticated = true }) =>
  isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />

export default PrivateRoute
