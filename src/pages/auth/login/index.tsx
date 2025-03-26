import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import AuthContext from '@/lib/context/authContext';
import { Login as LoginInterface } from '@/lib/interface/auth';
import { loginSchema } from '@/lib/schemas/auth';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { EyeIcon, Loader2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formMethods = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = formMethods;

  const onSubmit = async (values: LoginInterface) => {
    try {
      const response = await axios.post('/api/login', values);
      if (response) {
        updateUser(response.data.data)
        toast.success(response.data.message);
        navigate('/auth/login');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Registration failed, Please try again');

    }
  };

  return (
    <>
      <h5 className="font-medium text-2xl mb-10">Welcome Back!</h5>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2 relative">
              <p>Email</p>
              <Input
                placeholder="Enter Email Address"
                type="email"
                {...register('email')}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <p>Password</p>
              <Input
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                trailing={
                  <EyeIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                }
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Button
              className="w-full mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className={cn('h-4 w-4 animate-spin mr-2')} />
              )}
              Login
            </Button>
          </form>
        </FormProvider>

        <p className="text-center mt-4 text-[#344054] text-sm">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-semibold">
            Register
          </Link>
        </p>
    </>
  );
};

export default Login;
