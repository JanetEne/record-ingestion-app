import { createContext, ReactNode, useState, useEffect, useContext } from 'react'
import { UploadResponse } from '@/lib/interface/upload'
import { Constants } from '@/utils/constants'
import { SecureStorage } from '@/utils/storage';
import AuthContext from './authContext';

const secureStorage = new SecureStorage();


interface UploadContextInterface {
  uploads: UploadResponse[]
  addUpload: (upload: UploadResponse) => void
  updateUploads: (upload: UploadResponse[]) => void
  isProcessing: boolean
  processingSteps: string[];
  setProcessingSteps: (v: string[])=> void;
  progress: number;
  setProgress: (v: number)=> void;
  setIsProcessing: (v: boolean) => void;
}

const UploadsContext = createContext<UploadContextInterface>({} as UploadContextInterface)
export const UploadsContextProvider = UploadsContext.Provider;

export function UploadsProviderContainer({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadResponse[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingSteps, setProcessingSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0)

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const storedUploads = secureStorage.getItem(Constants.uploads);
    if (storedUploads) {
      try {
        setUploads(JSON.parse(storedUploads));
      } catch (error) {
        console.error('Failed to parse stored uploads:', error);
        secureStorage.removeItem(Constants.uploads);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setUploads([]);
      secureStorage.removeItem(Constants.uploads);
    }
  }, [user]);

  const addUpload = (upload: UploadResponse) => {
    setUploads(prev => {
      const exists = prev.some(u => u.id === upload.id);
      if (exists) {
        return prev;
      }
      const newUploads = [upload, ...prev];
      secureStorage.storeItem(Constants.uploads, JSON.stringify(newUploads));
      return newUploads;
    });
  };

  const updateUploads = (response: UploadResponse[]) => {
    const uniqueUploads = response.reduce((acc: UploadResponse[], current: UploadResponse) => {
      const exists = acc.some(upload => upload.id === current.id);
      return exists ? acc : [...acc, current];
    }, []);

    setUploads(uniqueUploads);
    secureStorage.storeItem(Constants.uploads, JSON.stringify(uniqueUploads));
  };

  return (
    <UploadsContextProvider
      value={{ 
        uploads, 
        addUpload,
        isProcessing,
        processingSteps,
        updateUploads,
        progress,
        setProgress,
        setIsProcessing,
        setProcessingSteps
      }}
    >
      {children}
    </UploadsContextProvider>
  )
}

export default UploadsContext;
