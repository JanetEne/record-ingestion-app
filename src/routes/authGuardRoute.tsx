import AuthContext from '@/lib/context/authContext';
import { FC, ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router';

interface IProps {
  children: ReactNode;
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/main/dashboard';

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to={from} replace />;
  }


  return <div>{children}</div>;
};

export default AuthGuard;
