import AuthPages from '@/pages/auth';
import MainPages from '@/pages/main';
import { Route, Routes } from 'react-router';
import AuthGuard from './authGuardRoute';
import ProtectedRoute from './protectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainPages />
          </ProtectedRoute>
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
