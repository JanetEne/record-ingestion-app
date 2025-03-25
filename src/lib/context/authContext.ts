'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  FC,
} from 'react';
import { User } from '../interface/user';
import { SecureStorage } from '@/utils/storage';
import { Constants } from '@/utils/constants';

type Props = {
  children?: ReactNode;
};

const secureStorage = new SecureStorage();

interface AuthContextInterface {
  user: User | null;
  updateUser: (value: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);
export const AuthProvider = AuthContext.Provider;

export const AuthProviderContainer: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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

  const logout = () => {
    setUser(null);
    secureStorage.removeItem(Constants.user);
  };

  return (
    <AuthProvider value={{ user, updateUser, logout }}>{children}</AuthProvider>
  );
};

export default AuthContext;
