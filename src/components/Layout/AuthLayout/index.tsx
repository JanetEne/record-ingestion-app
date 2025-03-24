import { Outlet } from 'react-router';
import CredrailsLogo from '@/assets/images/credrails-logo.png';

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full"></div>
      <div className="flex items-center gap-1 justify-center mt-10">
        <img src={CredrailsLogo} alt="credrails-logo" />
      </div>
      <div className="flex-1">
        <div className="flex h-full justify-center items-center">
          <div className="w-full max-w-md mx-4 my-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
