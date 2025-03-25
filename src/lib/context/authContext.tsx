import { Constants } from '@/utils/constants';
import { SecureStorage } from '@/utils/storage';
import { createContext, FC, useEffect, useState, type ReactNode } from 'react';
import { User } from '../interface/user';

type Props = {
  children: ReactNode;
};

interface ContextInterface {
  user: User | null;
  updateUser: (value: User) => void;
  logout: () => void;
}

const AuthContext = createContext<ContextInterface>({} as ContextInterface);
export const AuthContextProvider = AuthContext.Provider;

export const AuthProviderContainer: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const secureStorage = new SecureStorage();

  const updateUser = (value: User) => {
    setUser(value);
    secureStorage.storeItem(Constants.user, JSON.stringify(value));
  };

  const logout = () => {
    setUser(null);
    secureStorage.removeItem(Constants.user);
  };

  useEffect(() => {
    const storedUser = secureStorage.getItem(Constants.user);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        secureStorage.removeItem(Constants.user);
      }
    }
  }, []);

  const contextValue: ContextInterface = {
    user,
    updateUser,
    logout,
  };

  return (
    <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>
  );
};

export default AuthContext;
