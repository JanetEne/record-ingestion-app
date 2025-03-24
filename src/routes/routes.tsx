import AuthPages from '@/pages/auth';
import MainPages from '@/pages/main';
import { Route, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthPages />} />
      <Route path="main/*" element={<MainPages />} />
    </Routes>
  );
};

export default AppRoutes;
