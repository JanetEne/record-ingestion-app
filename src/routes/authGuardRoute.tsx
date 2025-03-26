import AuthContext from '@/lib/context/authContext';
import { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router';

interface IProps {
  children: ReactNode;
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to={'/'} replace />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
