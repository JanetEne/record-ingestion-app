import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Link } from 'react-router';
import { Register as RegisterInterface } from '@/lib/interface/auth';
import { registerSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { EyeIcon } from 'lucide-react';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    formState: { errors },
  } = formMethods;

  const onSubmit = (values: RegisterInterface) => {
    setIsLoading(true);
  };

  return (
    <>
      <h5 className="text-center font-medium text-2xl mb-10">Sign Up</h5>
      <Card>
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <p>First Name</p>
              <Input
                placeholder="Enter First Name"
                type="text"
                {...(register('firstName'), { required: true })}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.firstName?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p>Last Name</p>
              <Input
                placeholder="Enter Last Name"
                type="text"
                {...(register('lastName'), { required: true })}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.lastName?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input
                placeholder="Enter Email Address"
                type="email"
                {...(register('email'), { required: true })}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p>Mobile Number</p>
              <Input
                placeholder="Enter Phone Number"
                type="tel"
                {...(register('mobileNumber'), { required: true })}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.mobileNumber?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p>Password</p>
              <Input
                placeholder="Enter Password"
                type="password"
                {...(register('password'), { required: true })}
                trailing={<EyeIcon className="w-4 h-4" />}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p>Confirm Password</p>
              <Input
                placeholder="Enter Confirm Password"
                type="password"
                {...(register('confirmPassword'), { required: true })}
                trailing={<EyeIcon className="w-4 h-4" />}
              />
              {errors && (
                <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <Button className="w-full mt-6" type="submit">
              Register
            </Button>
          </form>
        </Form>

        <p className="text-center mt-4 text-sm text-[#344054]">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold">
            Login
          </Link>
        </p>
      </Card>
    </>
  );
};

export default Register;
