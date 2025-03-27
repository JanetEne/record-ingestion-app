import AuthContext from '@/lib/context/authContext';
import { FC, JSX, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth/login', { state: { from: location } });
    }
  }, [isLoading, user, navigate, location]);

  if (isLoading) {
    return null
  }

  if (!user) {
    return null;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;