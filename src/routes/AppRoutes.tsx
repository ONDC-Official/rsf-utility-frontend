import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import OrdersInProgress from 'pages/OrdersInProgress'
import OrdersReady from 'pages/OrdersReady'
import SettlementGenerator from 'pages/SettlementGenerator'
import SettlementDashboard from 'pages/SettlementDashboard'
import Layout from 'components/layout/Layout'
import ComingSoon from 'components/common/ComingSoon'
import PrivateRoute from 'routes/PrivateRoute'
import { ROUTES } from 'constants/routes.constants'
import MiscSettlements from 'pages/MiscSettlements'
import NilSettlement from 'pages/NilSettlement'

const AppRoutes: FC = () => (
  <Routes>
    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.ORDERS_PROGRESS} replace />} />

    <Route
      path={ROUTES.ORDERS_PROGRESS}
      element={
        <PrivateRoute>
          <Layout>
            <OrdersInProgress />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.CONFIGURATION}
      element={
        <PrivateRoute>
          <Layout>
            <ComingSoon title="Configuration" />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.ORDERS_READY}
      element={
        <PrivateRoute>
          <Layout>
            <OrdersReady />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.SETTLEMENT_GENERATOR}
      element={
        <PrivateRoute>
          <Layout>
            <SettlementGenerator />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.SETTLEMENT_DASHBOARD}
      element={
        <PrivateRoute>
          <Layout>
            <SettlementDashboard />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.RECONCILIATION}
      element={
        <PrivateRoute>
          <Layout>
            <ComingSoon title="Reconciliation" />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.MISC_SETTLEMENTS}
      element={
        <PrivateRoute>
          <Layout>
            <MiscSettlements />
          </Layout>
        </PrivateRoute>
      }
    />

    <Route
      path={ROUTES.NIL_SETTLEMENT}
      element={
        <PrivateRoute>
          <Layout>
            <NilSettlement />
          </Layout>
        </PrivateRoute>
      }
    />
  </Routes>
)

export default AppRoutes
