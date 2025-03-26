import { createContext, ReactNode, useState, useEffect } from 'react'
import { UploadResponse } from '@/lib/interface/upload'
import { Constants } from '@/utils/constants'
import { SecureStorage } from '@/utils/storage';

const secureStorage = new SecureStorage();

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface UploadContextInterface {
  uploads: UploadResponse[]
  addUpload: (upload: UploadResponse) => void
  isLoading: boolean
  status: UploadStatus;
  progress: number;
  setProgress: (v: number)=> void;
  setIsLoading: (v: boolean) => void;
  setStatus: (v: UploadStatus) => void
}

const UploadsContext = createContext<UploadContextInterface>({} as UploadContextInterface)
export const UploadsContextProvider = UploadsContext.Provider;

export function UploadsProviderContainer({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<UploadStatus>('idle')
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
        isLoading,
        status,
        progress,
        setProgress,
        setIsLoading,
        setStatus
      }}
    >
      {children}
    </UploadsContextProvider>
  )
}

export default UploadsContext;
