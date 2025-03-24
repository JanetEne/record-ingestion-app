import { Toaster } from 'sonner';
import AppRoutes from './routes/routes';
import { BrowserRouter } from 'react-router';

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
