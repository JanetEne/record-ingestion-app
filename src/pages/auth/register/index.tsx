import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Link } from 'react-router';

const Register = () => {
  return (
    <>
      <h5 className="text-center font-medium text-2xl mb-10">Sign Up</h5>
      <Card>
        <form>
          <div className="flex flex-col gap-2 mb-4">
            <p>First Name</p>
            <Input placeholder="Enter First Name" type="text" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>Last Name</p>
            <Input placeholder="Enter Last Name" type="text" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>Email</p>
            <Input placeholder="Enter Email Address" type="email" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>Phone</p>
            <Input placeholder="Enter Phone Number" type="tel" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>Password</p>
            <Input placeholder="Enter Password" type="password" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <p>Confirm Password</p>
            <Input placeholder="Enter Confirm Password" type="password" />
          </div>

          <Button className="w-full mt-6">Register</Button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </Card>
    </>
  );
};

export default Register;
