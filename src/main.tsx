import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProviderContainer } from './lib/context/authContext.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProviderContainer>
      <App />
      <Toaster richColors={true} position="top-right" />
    </AuthProviderContainer>
  </StrictMode>
);
