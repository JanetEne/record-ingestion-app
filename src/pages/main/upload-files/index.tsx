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
      <div className="flex justify-center items-center flex-col h-full">
        <Card className="max-w-xl w-full">
          <form>
            <div className="flex flex-col gap-2 mb-4">
              <p>Start Date</p>
              <DatePicker />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <p>End Date</p>
              <DatePicker />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <p>Date Type</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Date Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="creationDate">Creation Date</SelectItem>
                    <SelectItem value="modificationDate">
                      Modification Date
                    </SelectItem>
                    <SelectItem value="publicationDate">
                      Publication Date
                    </SelectItem>
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
