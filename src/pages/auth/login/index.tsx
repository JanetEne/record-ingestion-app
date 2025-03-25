import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Login as LoginInterface } from '@/lib/interface/auth';
import { loginSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    formState: { errors },
  } = formMethods;

  const onSubmit = (values: LoginInterface) => {
    setIsLoading(true);
  };

  return (
    <>
      <h5 className="text-center font-medium text-2xl mb-10">Welcome Back!</h5>
      <Card>
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <Button className="w-full mt-6" type="submit">
              Login
            </Button>
          </form>
        </Form>

        <p className="text-center mt-4 text-[#344054] text-sm">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-semibold">
            Register
          </Link>
        </p>
      </Card>
    </>
  );
};

export default Login;
