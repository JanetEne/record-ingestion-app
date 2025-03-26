import { Button } from '@/components/Button';
import Pagination from '@/components/Pagination';
import UploadsContext from '@/lib/context/uploadsContext';
import { UploadResponse } from '@/lib/interface/upload';
import { cn } from '@/utils/cn';
import axios from 'axios';
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';

const Details = () => {
  const { uploads, updateUploads } = useContext(UploadsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [size, setSize] = useState(10);

  const fetchUploads = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/uploads');
      if (response) {
        updateUploads(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch uploads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (uploads.length === 0) {
      fetchUploads();
    }
  }, []);

  const totalRecords = uploads.length || 0;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const paginatedUploads = uploads.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <p className="text-xl lg:text-2xl font-medium mb-6">Records</p>
      <div className="rounded-md font-normal border border-gray-200 overflow-hidden mt-8">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full ">
            <div className=" overflow-x-auto ">
              <table className="table-auto min-w-full">
                <thead className="bg-[#4f54f8] text-white">
                  <tr className="border-b border-grey">
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      File Name
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      Upload Date
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      Start Date
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      End Date
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      Date Type
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      Number of Records
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUploads.length > 0 ? (
                    paginatedUploads.map((upload: UploadResponse) => (
                      <tr
                        key={upload.id}
                        className={cn('border-b border-gray-200')}
                      >
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.fileName}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.uploadDate &&
                            format(
                              new Date(upload.uploadDate),
                              'MMM do, yyyy H:mma'
                            )}{' '}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.startDate &&
                            format(
                              new Date(upload.startDate),
                              'MMM do, yyyy H:mma'
                            )}{' '}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.endDate &&
                            format(
                              new Date(upload.endDate),
                              'MMM do, yyyy H:mma'
                            )}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.dateType}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.numOfRecords}
                        </td>
                        <td className="text-sm p-4 font-medium text-[#4f54f8] whitespace-nowrap">
                          <Link to={`/details/${upload.id}`}>View content</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[200px]">
                      <td colSpan={9}>
                        <div className="flex flex-col gap-4 w-full justify-center items-center">
                          <p className="text-base font-medium">
                            No Records have been added yet.
                          </p>
                          <Link to="/uploads">
                            <Button className="px-8">Upload Files</Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {totalRecords > 0 && (
          <Pagination
            totalItems={totalRecords}
            itemsPerPage={size}
            setPage={setCurrentPage}
            page={currentPage}
            setSize={setSize}
          />
        )}
      </div>
    </div>
  );
};

export default Details;
