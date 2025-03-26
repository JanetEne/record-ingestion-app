import { Button } from '@/components/Button';
import UploadsContext from '@/lib/context/uploadsContext';
import { UploadResponse } from '@/lib/interface/upload';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import { useContext } from 'react';
import { Link } from 'react-router';

const Details = () => {
  const { uploads } = useContext(UploadsContext);

  return (
    <div className="w-full">
      <p className="text-2xl font-medium mb-6">Records</p>
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
                      Number of Records Processed
                    </th>

                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap">
                      More
                    </th>
                    <th className="text-sm font-medium text-left p-4 whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.length > 0 ?
                    uploads.map((upload: UploadResponse, index) => (
                      <tr key={upload.id} className={cn('cursor-pointer', {
                        'border-b border-gray-200':
                          uploads.length > 1 &&
                          index < uploads.length - 1,
                      })}>

                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.fileName}
                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.uploadDate &&
                            format(
                              new Date(upload.uploadDate),
                              'MMM do, yyyy H:mma'
                            )}            </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.startDate &&
                            format(
                              new Date(upload.startDate),
                              'MMM do, yyyy H:mma'
                            )}               </td><td className="text-sm p-4 whitespace-nowrap">
                          {upload.endDate &&
                            format(
                              new Date(upload.endDate),
                              'MMM do, yyyy H:mma'
                            )}
                        </td><td className="text-sm p-4 whitespace-nowrap">
                          {upload.dateType}

                        </td>
                        <td className="text-sm p-4 whitespace-nowrap">
                          {upload.numOfRecords}

                        </td>
                      </tr>
                    ))
                    : <tr className="h-[200px]">
                      <td colSpan={9}>
                        <div className='flex flex-col gap-4 w-full justify-center items-center'>
                          <p className='text-base font-medium'>No Records have been added yet.</p>
                          <Link to='/main/uploads'>
                          <Button className='px-8'>Upload Files</Button>
                          </Link>
                        </div>
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Details;
