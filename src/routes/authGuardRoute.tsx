import AuthContext from '@/lib/context/authContext';
import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router';

interface IProps {
  children: ReactNode;
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/main/dashboard" replace />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
