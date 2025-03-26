import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fileName: string;
}

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, fileName, ...props }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div>
        <div className="flex items-center">
          <div className="flex-1 flex justify-between items-center border border-gray-800 text-muted-foreground rounded-[4px] bg-transparent font-normal text-sm">
            <span className="block truncate p-3.5">
              {fileName || 'No file Selected'}
            </span>
            <button
              type="button"
              className="bg-gray-100 text-primary w-[40%] p-3.5 rounded-r-[4px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <p> Choose File</p>
            </button>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".csv, .xlsx"
            onChange={onChange}
            ref={fileInputRef}
            {...props}
          />
        </div>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
