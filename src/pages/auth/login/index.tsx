import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Link } from 'react-router';

const Login = () => {
  return (
    <>
      <h5 className="text-center font-medium text-2xl mb-10">Welcome Back!</h5>
      <Card>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <p>Email</p>
            <Input placeholder="Enter Email Address" type="email" />
          </div>

          <div className="flex flex-col gap-2">
            <p>Password</p>
            <Input placeholder="Enter Password" type="password" />
          </div>

          <Link to="/main/dashboard">
            <Button className="w-full mt-6">Login</Button>
          </Link>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/auth/register">Register</Link>
        </p>
      </Card>
    </>
  );
};

export default Login;
