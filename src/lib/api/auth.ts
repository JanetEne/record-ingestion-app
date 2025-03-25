import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SecureStorage } from '@/utils/storage';
import { Constants } from '@/utils/constants';
import { simulateDelay } from '@/utils/simulateDelay';
import { v4 as uuidv4 } from 'uuid';
import { Login, Register } from '../interface/auth';
import { User } from '../interface/user';

const secureStorage = new SecureStorage();
const mock = new MockAdapter(axios);

const getCurrentUser = (): User | null => {
  const user = secureStorage.getItem(Constants.currentUser);
  return user ? JSON.parse(user) : null;
};

const saveCurrentUser = (user: User | null) => {
  if (user) {
    secureStorage.storeItem(Constants.currentUser, JSON.stringify(user));
  } else {
    secureStorage.removeItem(Constants.currentUser);
  }
};

mock.onPost('/api/register').reply(async (config) => {
  await simulateDelay(1000);
  const userData: Register = JSON.parse(config.data);
  const currentUser = getCurrentUser();

  if (currentUser && currentUser.email === userData.email) {
    return [400, { error: 'Email already in use' }];
  }

  const newUser: User = {
    id: uuidv4(),
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    mobileNumber: userData.mobileNumber,
    password: userData.password,
  };

  saveCurrentUser(newUser);

  const { password, ...userWithoutPassword } = newUser;
  return [201, userWithoutPassword];
});

mock.onPost('/api/login').reply(async (config) => {
  await simulateDelay(800);
  const loginData: Login = JSON.parse(config.data);
  const currentUser = getCurrentUser();

  if (
    !currentUser ||
    currentUser.email !== loginData.email ||
    currentUser.password !== loginData.password
  ) {
    return [401, { error: 'Invalid credentials' }];
  }

  const { password, ...userWithoutPassword } = currentUser;
  return [200, userWithoutPassword];
});

export default axios;