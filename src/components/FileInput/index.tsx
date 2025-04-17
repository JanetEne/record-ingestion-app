import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fileName: string;
}

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, fileName, ...props }, forwardedRef) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleRef = (instance: HTMLInputElement | null) => {
      fileInputRef.current = instance;
      if (typeof forwardedRef === 'function') {
        forwardedRef(instance);
      } else if (forwardedRef) {
        (forwardedRef as React.RefObject<HTMLInputElement | null>).current = instance;
      }
    };

    return (
      <div className="w-full">
        <div className="flex-1 flex justify-between items-center border border-gray-800 text-muted-foreground rounded-[4px] bg-transparent font-normal text-sm">
          <span
            className="block p-3.5 truncate flex-1 min-w-0"
            title={fileName || 'No file selected'}
          >
            {fileName || 'No file selected'}
          </span>
          <button
            type="button"
            className="bg-gray-100 text-gray-800 w-auto lg:w-[150px] p-3.5 rounded-r-[4px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            aria-label="Choose file"
          >
            <p>Choose File</p>
          </button>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv, .xlsx"
          onChange={onChange}
          ref={handleRef}
          {...props}
        />
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };