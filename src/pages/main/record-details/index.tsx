import Pagination from '@/components/Pagination';
import UploadsContext from '@/lib/context/uploadsContext';
import { UploadResponse } from '@/lib/interface/upload';
import { cn } from '@/utils/cn';
import { simulateDelay } from '@/utils/simulateDelay';
import { ArrowLeft } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const RecordContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upload, setUpload] = useState<UploadResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [size, setSize] = useState(10);

  const { uploads } = useContext(UploadsContext);

  const fetchUploadDetails = async () => {
    try {
      setIsLoading(true);
      await simulateDelay(800);

      const foundUpload = uploads.find((u) => u.id === id);
      setUpload(foundUpload || null);
    } catch (err) {
      toast.error('Failed to fetch upload details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploadDetails();
  }, [id, uploads]);

  const totalRecords = upload?.processedFile?.length || 0;
  const startIndex = (currentPage - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData =
    upload?.processedFile?.slice(startIndex, endIndex) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!upload) {
    return <div>No upload found</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </div>
        <p className="text-xl font-medium">{upload.fileName}</p>
      </div>

      {upload.processedFile?.length > 0 ? (
        <div className="rounded-md font-normal border border-gray-200 overflow-hidden mt-8">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className=" overflow-x-auto ">
                <table className="table-auto min-w-full">
                  <thead className="bg-[#4f54f8] text-white">
                    <tr className="border-b border-grey">
                      {Object.keys(upload.processedFile[0]).map((key) => (
                        <th
                          key={key}
                          className="text-sm font-medium text-left p-4 whitespace-nowrap capitalize"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr
                        key={index}
                        className={cn('border-b border-gray-200')}
                      >
                        {Object.values(row).map((value, rowIndex) => (
                          <td
                            key={rowIndex}
                            className="text-sm p-4 whitespace-nowrap"
                          >
                            {value !== null && value !== undefined
                              ? String(value)
                              : '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
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
      ) : (
        <div>No processed data available</div>
      )}
    </div>
  );
};

export default RecordContent;
