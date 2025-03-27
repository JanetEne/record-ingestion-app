import AuthContext from '@/lib/context/authContext';
import { FC, ReactNode, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface IProps {
  children: ReactNode;
}

const AuthGuard: FC<IProps> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, user, navigate, location]);

  if (isLoading) {
    return null
  }

  if (user) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthGuard;