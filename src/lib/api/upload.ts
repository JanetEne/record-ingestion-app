import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SecureStorage } from '@/utils/storage';
import { Constants } from '@/utils/constants';
import { UploadPaylod, UploadResponse } from '../interface/upload';
import { v4 as uuidv4 } from 'uuid';

const secureStorage = new SecureStorage();
const mock = new MockAdapter(axios, { delayResponse: 1000 });

const getFileUploads = (): UploadResponse[] => {
  const uploads = secureStorage.getItem(Constants.uploads);
  return uploads ? JSON.parse(uploads) : [];
};

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
      message: 'File uploaded successfully'
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

export default axios;