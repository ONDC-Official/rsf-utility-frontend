import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import OrdersInProgress from '@pages/OrdersInProgress';
import PrivateRoute from './PrivateRoute';

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
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;