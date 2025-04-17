import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Button } from '../Button';
import { Calendar } from "../Calendar";
import { ControllerRenderProps, Path } from 'react-hook-form';

interface DatePickerProps<
  TFieldValues extends object,
  TName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName> & { value: Date };
  className?: string;
  placeholder: string;
  id: string
}

export function DatePicker<
  TFieldValues extends object,
  TName extends Path<TFieldValues>,
>({
  field,
  className,
  placeholder,
  id
}: DatePickerProps<TFieldValues, TName>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'calendar'}
          className={cn(
            'w-full justify-between font-normal',
            !field.value && 'text-muted-foreground',
            className
          )}
          id={id}
        >
          {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus

        />
      </PopoverContent>
    </Popover>
  );
}