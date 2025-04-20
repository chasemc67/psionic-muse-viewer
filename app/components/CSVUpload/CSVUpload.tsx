import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils/cn';

interface CSVUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  hasExistingFile?: boolean;
}

export function CSVUpload({
  onUpload,
  isUploading = false,
  hasExistingFile = false,
}: CSVUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        alert('Please upload a CSV file');
        return;
      }
      await onUpload(file);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
        dragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25',
        isUploading && 'opacity-50 cursor-not-allowed',
      )}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="text-muted-foreground">
          {hasExistingFile ? (
            <>
              <p>A CSV file has already been uploaded</p>
              <p className="text-sm">Drop a new file to replace it</p>
            </>
          ) : (
            <>
              <p>Drop your CSV file here</p>
              <p className="text-sm">or click to select</p>
            </>
          )}
        </div>
        <Button
          variant="outline"
          disabled={isUploading}
          onClick={e => e.stopPropagation()}
        >
          {isUploading ? 'Uploading...' : 'Select File'}
        </Button>
      </div>
    </div>
  );
}
