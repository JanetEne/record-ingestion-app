import { createContext, ReactNode, useState, useEffect } from 'react'
import { UploadResponse } from '@/lib/interface/upload'
import { Constants } from '@/utils/constants'
import { SecureStorage } from '@/utils/storage';

const secureStorage = new SecureStorage();


interface UploadContextInterface {
  uploads: UploadResponse[]
  addUpload: (upload: UploadResponse) => void
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

  useEffect(() => {
    const storedUploads = secureStorage.getItem(Constants.uploads)
    if (storedUploads) setUploads(JSON.parse(storedUploads))
  }, [])

  const addUpload = (upload: UploadResponse) => {
    setUploads(prev => [upload, ...prev])
    secureStorage.storeItem(Constants.uploads, JSON.stringify([upload, ...uploads]))
  }

  return (
    <UploadsContextProvider
      value={{ 
        uploads, 
        addUpload,
        isProcessing,
        processingSteps,
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
