import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SecureStorage } from '@/utils/storage';
import { Constants } from '@/utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { Login, Register } from '../interface/auth';
import { User } from '../interface/user';

const secureStorage = new SecureStorage();
const mock = new MockAdapter(axios, { delayResponse: 1000 });

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

mock.onPost('/api/register').reply((config) => {
  try {
    const userData: Register = JSON.parse(config.data);

    const { firstName, lastName, email, mobileNumber, password } = userData;

    if (!firstName || !lastName || !email || !mobileNumber || !password) {
      return [
        400,
        {
          success: false,
          error: 'All fields are required',
        },
      ];
    }

    const newUser: User = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    };

    saveCurrentUser(newUser);

    const { password: userPassword, ...user } = newUser;

    return [201, {
      success: true,
      data: user,
      message: 'Registration successful'
    }];
  } catch (error) {
    return [
      400,
      {
        success: false,
        error: 'Invalid request',
      },
    ];
  }
});

mock.onPost('/api/login').reply(async (config) => {
  try {
    const loginData: Login = JSON.parse(config.data);
    const currentUser = getCurrentUser();

    if (
      !currentUser ||
      currentUser.email !== loginData.email ||
      currentUser.password !== loginData.password
    ) {
      return [401, {
        success: false,
        error: 'Invalid Credentials',
      }];
    }

    const { password, ...user } = currentUser;

    return [200, {
      success: true,
      data: user,
      message: 'Login successful'
    }];
  }
  catch (error) {
    return [
      400,
      {
        success: false,
        error: 'Invalid request',
      },
    ];
  }
});

export default axios;