import { Button } from '@/components/Button';
import { Link } from 'react-router';

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h5 className="text-4xl font-medium mb-8">Welcome Janet,</h5>
      <p className="text-[#344054] text-base font-normal">
        Upload CSV or XLSX files, process them, and view the details of the
        records
      </p>

      <div className="flex gap-4 mt-8">
        <Link to={'/main/uploads'}>
          <Button>Upload Files</Button>
        </Link>
        <Link to={'/main/details'}>
          <Button variant={'outline'}>View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
