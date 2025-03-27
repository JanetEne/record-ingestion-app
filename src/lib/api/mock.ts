import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SecureStorage } from '@/utils/storage';
import { Constants } from '@/utils/constants';
import { v4 as uuidv4 } from 'uuid';
import { Login, Register } from '../interface/auth';
import { UploadPaylod, UploadResponse } from '../interface/upload';
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

const getFileUploads = (): UploadResponse[] => {
  const uploads = secureStorage.getItem(Constants.uploads);
  return uploads ? JSON.parse(uploads) : [];
};

mock.onPost('/api/register').reply(async (config) => {

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

mock.onPost('/api/uploads').reply(async (config) => {

  try{
    const uploadData: UploadPaylod = JSON.parse(config.data);
    const { startDate, endDate, dateType, fileName, numOfRecords, processedFile } = uploadData
  
    if (!uploadData) {
      return [
        400,
        {
          success: false,
          error: 'File upload failed, Please try again',
        },
      ];
    }
  
    const newUpload: UploadResponse = {
      id: uuidv4(),
      uploadDate: new Date().toISOString(),
      startDate,
      endDate,
      dateType,
      fileName,
      numOfRecords,
      processedFile
    }
  
    return [201, {
      success: true,
      data: newUpload,
      message: 'Your file has been uploaded and processed successfully.'
    }]
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

mock.onGet('/api/uploads').reply(async () => {
  const uploads = getFileUploads()

  if (!uploads) {
    return [500, {
      success: false,
      error: 'Failed to fetch uploads'
    }]
  }

  return [200, {
    success: true,
    data: uploads
  }]

})

export default mock;