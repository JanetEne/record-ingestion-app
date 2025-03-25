import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DatePicker } from '@/components/DatePicker';
import { FileInput } from '@/components/FileInput';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';

const UploadFile = () => {
  return (
    <>
      <p className="text-xl font-medium mb-6">Upload File</p>
      <div className="flex justify-center items-center flex-col">
        <Card className="max-w-2xl w-full">
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 mb-4">
                <p>Start Date</p>
                <DatePicker />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <p>End Date</p>
                <DatePicker />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <p>Date Type</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Date Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="1mon">1 month</SelectItem>
                    <SelectItem value="2mon">3 months</SelectItem>
                    <SelectItem value="3mon">6 months</SelectItem>
                    <SelectItem value="12mon">1 year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <p>
                Upload File{' '}
                <span className="text-xs">(CSV or XLSX, max 5mb)</span>
              </p>
              <FileInput fileName="" />
            </div>

            <Button className="w-full mt-6">Upload</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UploadFile;
