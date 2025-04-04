import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Register as RegisterInterface } from '@/lib/interface/auth';
import { registerSchema } from '@/lib/schemas/auth';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { EyeIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const formMethods = useForm<RegisterInterface>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = formMethods;


  const onSubmit = async (values: RegisterInterface) => {
    try {
      const response = await axios.post('/api/register', values);
      if (response) {
        toast.success(response.data.message);
        navigate('/auth/login');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Registration failed, Please try again');
    }
  };



  return (
    <>
      <h5 className="font-medium text-2xl mb-10">Sign Up</h5>
      <div>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">

              <div className="flex flex-col gap-2 relative">
                <p>First Name</p>
                <Input
                  placeholder="Enter First Name"
                  type="text"
                  {...register('firstName')}
                />
                {errors && (
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 relative">
                <p>Last Name</p>
                <Input
                  placeholder="Enter Last Name"
                  type="text"
                  {...register('lastName')}
                />
                {errors && (
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
            </div>

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
              <p>Mobile Number</p>
              <Input
                placeholder="Enter Mobile Number"
                type="tel"
                {...register('mobileNumber')}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.mobileNumber?.message}
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

            <div className="flex flex-col gap-2 relative">
              <p>Confirm Password</p>
              <Input
                placeholder="Enter Confirm Password"
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                trailing={
                  <EyeIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                }
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.confirmPassword?.message}
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
              Register
            </Button>
          </form>
        </FormProvider>

        <p className="text-center mt-4 text-sm text-[#344054]">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
