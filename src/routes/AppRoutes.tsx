import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import OrdersInProgress from '@pages/OrdersInProgress'
import ComingSoon from '@components/common/ComingSoon'
import PrivateRoute from './PrivateRoute'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders-progress" replace />} />
      <Route
        path="/orders-progress"
        element={
          <PrivateRoute>
            <Layout>
              <OrdersInProgress />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/configuration"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Configuration" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders-ready"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Orders Ready" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settlement-generator"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Settlement Generator" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settlement-dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Settlement Dashboard" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/reconciliation"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Reconciliation" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/misc-settlements"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Misc Settlements" />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/nil-settlement"
        element={
          <PrivateRoute>
            <Layout>
              <ComingSoon title="Nil Settlement" />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
