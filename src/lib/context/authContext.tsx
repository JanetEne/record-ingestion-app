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
  isLoading: boolean;
}

const AuthContext = createContext<ContextInterface>({} as ContextInterface);
export const AuthContextProvider = AuthContext.Provider;

export const AuthProviderContainer: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const secureStorage = new SecureStorage();

  const updateUser = (value: User) => {
    setUser(value);
    secureStorage.storeItem(Constants.currentUser, JSON.stringify(value));
  };

  const logout = () => {
    setUser(null);
    secureStorage.removeItem(Constants.currentUser);
    secureStorage.removeItem(Constants.uploads);
  };

  useEffect(() => {
    const storedUser = secureStorage.getItem(Constants.currentUser);
    setIsLoading(true);
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        secureStorage.removeItem(Constants.currentUser);
      }
    }
    setIsLoading(false);
  }, []);

  const contextValue: ContextInterface = {
    user,
    updateUser,
    logout,
    isLoading, // Include in context
  };

  return (
    <AuthContextProvider value={contextValue}>{children}</AuthContextProvider>
  );
};

export default AuthContext;