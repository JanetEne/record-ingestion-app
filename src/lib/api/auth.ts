import { simulateDelay } from '@/utils/simulateDelay';
import { v4 as uuidv4 } from 'uuid';
import { Login, Register } from '../interface/auth';

const users: Record<string, any> = {};

export const registerUser = async (userData: Register) => {
  await simulateDelay(1000);

  const existingUser = Object.values(users).find(
    (user: any) => user.email === userData.email
  );

  if (existingUser) {
    throw new Error('Email already in use');
  }

  const userId = uuidv4();

  const newUser = {
    id: userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    mobileNumber: userData.mobileNumber,
    password: userData.password,
  };

  users[userId] = newUser;

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (userData: Login) => {
  await simulateDelay(800);

  const user = Object.values(users).find(
    (user: Login) =>
      user.email === userData.email && user.password === userData.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
