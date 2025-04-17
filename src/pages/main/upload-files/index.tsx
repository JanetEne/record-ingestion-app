import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { DatePicker } from '@/components/DatePicker';
import { FileInput } from '@/components/FileInput';
import { Progress } from '@/components/ProgressBar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import UploadsContext from '@/lib/context/uploadsContext';
import { IUpload, UploadPaylod } from '@/lib/interface/upload';
import { uploadSchema } from '@/lib/schemas/upload';
import { cleanupFileData } from '@/utils/cleanupFileData';
import { cn } from '@/utils/cn';
import { parseCSV, parseXLSX } from '@/utils/parseFiles';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const UploadFile = () => {
  const {
    addUpload,
    progress,
    setProgress,
    isProcessing,
    setIsProcessing,
    processingSteps,
    setProcessingSteps,
  } = useContext(UploadsContext);

  const navigate = useNavigate();

  const formMethods = useForm<IUpload>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      dateType: '',
      file: undefined,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = formMethods;

  const onSubmit = async (values: IUpload) => {
    const { startDate, endDate, dateType, file } = values;

    if (!file) return;

    try {
      setIsProcessing(true);
      setProcessingSteps(['Starting file processing...']);
      setProgress(10);

      setProcessingSteps([...processingSteps, 'Parsing file...']);
      setProgress(30);

      const fileType = file.name.split('.').pop()?.toLowerCase();
      let parsedData: any[] = [];

      if (fileType === 'csv') {
        parsedData = await parseCSV(file);
      } else if (fileType === 'xlsx') {
        parsedData = await parseXLSX(file);
      }

      setProcessingSteps([
        ...processingSteps,
        'Cleaning data (removing empty rows, trimming whitespaces)...',
      ]);
      setProgress(60);

      const processedData = await cleanupFileData(parsedData);
      setProcessingSteps([
        ...processingSteps,
        `Processed ${processedData.length} valid records`,
      ]);
      setProgress(80);

      const uploadPayload: UploadPaylod = {
        startDate,
        endDate,
        dateType,
        fileName: file.name,
        numOfRecords: processedData.length,
        processedFile: processedData,
      };

      setProcessingSteps([...processingSteps, 'Uploading processed data...']);
      setProgress(90);

      const response = await axios.post('/api/uploads', uploadPayload);

      if (response) {
        addUpload(response.data.data);
        toast.success(response.data.message);
        setProcessingSteps([
          ...processingSteps,
          'Upload completed successfully!',
        ]);
        setProgress(100);
        reset();
        navigate('/details');
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || 'Failed to upload, please try again'
      );
      setProcessingSteps([
        ...processingSteps,
        'An Error occured while processing file',
      ]);
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setProgress(0);
        setProcessingSteps([]);
      }, 2000);
    }
  };

  return (
    <>
      <p className="text-xl lg:text-2xl font-medium mb-6">Upload Files</p>
      <div className="flex justify-center items-center flex-col">
        <Card className="max-w-2xl w-full">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 relative">
                  <label htmlFor='startDate'>Start Date</label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        field={field}
                        placeholder="Select start date"
                        id='startDate'
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label htmlFor='endDate'>End Date</label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker field={field} placeholder="Select end date" id='endDate'
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 relative">
                <label htmlFor='dateType'>Date Type</label>
                <Controller
                  name="dateType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="dateType">
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
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                    {errors.dateType.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 relative">
                <label htmlFor='uploadFile'>
                  Upload File{' '}
                  <span className="text-xs">(CSV or XLSX, max 5mb)</span>
                </label>
                <Controller
                  name="file"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <FileInput
                      fileName={value?.name || ''}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      id="uploadFile"
                      {...field}
                    />
                  )}
                />
                {errors.file && (
                  <p className="text-[12px] absolute -bottom-[1.2rem] text-red-500">
                    {errors.file.message}
                  </p>
                )}
              </div>

              {(isProcessing || isSubmitting) && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">
                      {isProcessing ? 'Processing...' : 'Uploading...'}
                      {progress > 0 && ` (${progress}%)`}
                    </p>
                  </div>

                  <Progress value={progress} className="w-full" role='progressbar'/>

                  <div className="space-y-2 mt-2">
                    {processingSteps.map((step, i) => (
                      <p key={i} className="text-sm text-gray-600 flex items-start">
                        <span>{step}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-2"
                type="submit"
                disabled={isSubmitting || isProcessing}
                aria-label='Upload'
              >
                {(isSubmitting || isProcessing) && (
                  <Loader2 className={cn('h-4 w-4 animate-spin mr-2')} />
                )}
                {isProcessing
                  ? 'Processing...'
                  : isSubmitting
                    ? 'Uploading...'
                    : 'Upload'}
              </Button>
            </form>
          </FormProvider>
        </Card>
      </div>
    </>
  );
};

export default UploadFile;
