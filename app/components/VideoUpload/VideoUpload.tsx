import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils/cn';

interface VideoUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading?: boolean;
  hasExistingFile?: boolean;
}

export function VideoUpload({
  onUpload,
  isUploading = false,
  hasExistingFile = false,
}: VideoUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        alert('Please upload a video file');
        return;
      }

      // Check file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file size must be less than 100MB');
        return;
      }

      await onUpload(file);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    maxFiles: 1,
    disabled: isUploading,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
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
              <p>A video file has already been uploaded</p>
              <p className="text-sm">Drop a new file to replace it</p>
            </>
          ) : (
            <>
              <p>Drop your video file here</p>
              <p className="text-sm">or click to select</p>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP4, WebM, OGG (max 100MB)
              </p>
            </>
          )}
        </div>
        <Button
          variant="outline"
          disabled={isUploading}
          onClick={e => e.stopPropagation()}
        >
          {isUploading ? 'Uploading...' : 'Select Video'}
        </Button>
      </div>
    </div>
  );
}
