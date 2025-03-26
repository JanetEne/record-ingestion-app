import axios from '@/lib/api/upload';
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
import { IUpload, UploadPaylod } from '@/lib/interface/upload';
import { uploadSchema } from '@/lib/schemas/upload';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useContext } from 'react';
import UploadsContext from '@/lib/context/uploadsContext';
import { toast } from 'sonner';
import { parseCSV, parseXLSX } from '@/utils/parseFiles';
import { cleanupFileData } from '@/utils/cleanupFileData';


const UploadFile = () => {
  const { addUpload } = useContext(UploadsContext)

  const formMethods = useForm<IUpload>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      dateType: '',
      file: undefined
    },
    mode: 'onChange'
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = formMethods;

  const onSubmit = async (values: IUpload) => {
    const { startDate, endDate, dateType, file } = values

    let parsedData: any[] = []

    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase()

      if (fileType === 'csv') {
        parsedData = await parseCSV(file)
      } else if (fileType === 'xlsx') {
        parsedData = await parseXLSX(file)
      }

    }

    const processedData = cleanupFileData(parsedData)

    const uploadPayload: UploadPaylod = {
      startDate,
      endDate,
      dateType,
      fileName: file?.name!,
      numOfRecords: processedData.length,
      processedFile: processedData
    }

    try {
      const response = await axios.post('/api/uploads', uploadPayload)
      if (response) {
        addUpload(response.data.data)
        toast.success(response.data.message);
        reset()
      }
    }
    catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to upload, please try again');
    }


  }

  return (
    <>
      <p className="text-xl font-medium mb-6">Upload File</p>
      <div className="flex justify-center items-center flex-col">
        <Card className="max-w-2xl w-full">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 relative">
                  <p>Start Date</p>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        field={field}
                        placeholder="Select start date"
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                      {errors.startDate.message}</p>
                  )}
                </div>


                <div className="flex flex-col gap-1 relative">
                  <p>End Date</p>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        field={field}
                        placeholder="Select end date"
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 relative">
                <p>Date Type</p>
                <Controller
                  name="dateType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Date Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectItem value="1 month">1 month</SelectItem>
                          <SelectItem value="3 months">3 months</SelectItem>
                          <SelectItem value="6 months">6 months</SelectItem>
                          <SelectItem value="12 months">1 year</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.dateType && (
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">{errors.dateType.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1 relative">
                <p>
                  Upload File{' '}
                  <span className="text-xs">(CSV or XLSX, max 5mb)</span>
                </p>
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <FileInput
                      fileName={value?.name || ''}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  )}
                />
                {errors.file && (
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">{errors.file.message}</p>
                )}
              </div>

              <Button
                className="w-full mt-6"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className={cn('h-4 w-4 animate-spin mr-2')} />
                )}
                Upload
              </Button>
            </form>
          </FormProvider>
        </Card>
      </div>
    </>
  );
};

export default UploadFile;
