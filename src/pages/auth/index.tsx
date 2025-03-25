import AuthLayout from '@/components/Layout/AuthLayout';
import { Routes, Route } from 'react-router';
import Login from './login';
import Register from './register';

const AuthPages = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AuthPages;
