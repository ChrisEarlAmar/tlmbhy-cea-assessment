import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from "../auth/AuthContext";
import { useAuth } from "../auth/AuthContext";

import Layout from './layout';
import ToolpadAppProvider from './ToolpadAppProvider';
import Loader from '../components/core/LoaderPage';
import PageNotFound from '../components/core/PageNotFound';

const Home = lazy(() => import('../pages/Home'));
const SensorSimulator = lazy(() => import('../pages/SensorSimulator'));
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ToolpadAppProvider />}>
          {/* All child routes inside Layout are protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="sensor-simulator"
              element={
                <Suspense fallback={<Loader />}>
                  <SensorSimulator />
                </Suspense>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>

        {/* Guest-only routes */}
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
