import { Outlet } from 'react-router';
import CredrailsLogoWhite from '@/assets/images/credrails-logo-white.png';

const AuthLayout = () => {
  return (
    <div className="md:grid grid-cols-[60%_40%] h-screen">
      <div className="bg-white flex justify-center 2xl:justify-end items-center 2xl:pr-52">
        <div className="max-w-[500px] w-full mx-4 sm:mx-16 2xl:ml-52 py-10 md:py-0 h-screen md:h-fit relative">
          <Outlet />
        </div>
      </div>
      <div className="bg-[image:var(--auth-bg-url)] bg-cover bg-center relative hidden md:flex justify-center 2xl:justify-start items-center px-16 2xl:pl-40">
        <div className="absolute inset-0 bg-[#4f54f8]/90"></div>
        <div className="relative max-w-[400px] z-10">
          <img src={CredrailsLogoWhite} alt="credrails-logo-white" />
          <h1 className="text-xl lg:text-4xl font-semibold text-white mt-20">
            Simplify Your Workflow!
          </h1>
          <p className="mt-4 text-white/80">
            Simplify your workflow with seamless file uploads, flexible date range selections, secure storage, real-time progress tracking, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
