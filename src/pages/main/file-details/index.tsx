import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCard,
  Table,
} from '@/components/Table';
import { Separator } from '@radix-ui/react-select';

const Details = () => {
  return (
    <div className="w-full">
      <p className="text-xl font-medium mb-6">Records</p>
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead>File Name</TableHead>
            <TableHead className="text-center">Upload Date</TableHead>
            <TableHead className="text-center">Start Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Date Type</TableHead>
            <TableHead className="text-center">
              Number of Records Processed
            </TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill('')
            .map((_, index) => (
              <TableRow key={index} className="cursor-pointer">
                <TableCell className="text-sm font-medium">
                  Task 2 CSV
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  March 24, 2025
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  April 1, 2025
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  July 2, 2025
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  Modification Date
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  500
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-4">
        {Array(5)
          .fill('')
          .map((_, index) => (
            <TableCard key={index}>
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-lemon"></div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">
                      Store Name
                    </h5>
                    <p className="text-xs font-medium text-gray-600">
                      namesample@mail.com
                    </p>
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-600">
                  070111222333
                </p>
              </div>
              <Separator className="bg-gray-100 my-4" />
            </TableCard>
          ))}
      </div>
    </div>
  );
};

export default Details;
