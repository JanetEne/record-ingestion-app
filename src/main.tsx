import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProviderContainer } from './lib/context/authContext.tsx';
import { Toaster } from 'sonner';
import { UploadsProviderContainer } from './lib/context/uploadsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProviderContainer>
      <UploadsProviderContainer>
        <App />
        <Toaster richColors={true} position="top-right" />
      </UploadsProviderContainer>
    </AuthProviderContainer>
  </StrictMode>
);
