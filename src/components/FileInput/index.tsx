import { Loader2 } from 'lucide-react';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fileName: string;
  loading?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, fileName, loading, ...props }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div>
        <div className="flex items-center">
          <div className="flex-1 flex justify-between items-center border border-gray-800 text-gray-400 rounded-[4px] bg-transparent font-medium text-sm">
            <span className="block truncate p-3.5">
              {fileName || 'No file Selected'}
            </span>
            <button
              type="button"
              className="bg-gray-100 text-primary w-[40%] p-3.5 rounded-r-[4px] flex items-center justify-center"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <p> Choose File</p>
              {loading ? (
                <span>
                  <Loader2 className="loading-spinner w-5 h-5 ml-2" />
                </span>
              ) : null}
            </button>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
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
