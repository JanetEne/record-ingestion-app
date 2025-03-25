import { Toaster } from 'sonner';
import AppRoutes from './routes/routes';
import { BrowserRouter } from 'react-router';
import { AuthProviderContainer } from './lib/context/authContext';

function App() {
  return (
    <AuthProviderContainer>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProviderContainer>
  );
}

export default App;
