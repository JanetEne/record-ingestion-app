import AuthPages from '@/pages/auth';
import MainPages from '@/pages/main';
import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './protectedRoutes';
import AuthGuard from './authGuardRoute';
import AuthContext from '@/lib/context/authContext';
import { useContext } from 'react';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="main/*"
        element={
          <ProtectedRoute>
            <MainPages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          user ? (
            <Navigate replace to="/main/dashboard" />
          ) : (
            <Navigate replace to="/auth/login" />
          )
        }
      />
      <Route
        path="auth/*"
        element={
          <AuthGuard>
            <AuthPages />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
