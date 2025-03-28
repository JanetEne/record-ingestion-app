import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/routes';

function App() {
  return (
    <div className='font-body'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
