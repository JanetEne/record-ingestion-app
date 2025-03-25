import AuthContext from '@/lib/context/authContext';
import { FC, JSX, useContext } from 'react';
import { Navigate } from 'react-router';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
