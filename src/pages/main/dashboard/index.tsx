import { Button } from '@/components/Button';
import AuthContext from '@/lib/context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center flex-col min-h-[80vh]">
      <h5 className="text-3xl lg:text-5xl font-semibold mb-6">
        Welcome {user?.firstName} {user?.lastName},
      </h5>
      <p className="text-[#344054] text-lg text-center lg:text-xl font-normal">
        Upload CSV or XLSX files, process them, and view the details of the
        records
      </p>

      <div className="flex gap-4 mt-8">
        <Link to={'/uploads'}>
          <Button className="px-8">Upload Files</Button>
        </Link>
        <Link to={'/details'}>
          <Button variant={'outline'} className="px-8">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
