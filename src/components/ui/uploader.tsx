import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { Accept, FileWithPath, useDropzone } from 'react-dropzone';
import { FileWithPreview, ImageCropper } from './image-crop';
import { useToast } from './use-toast';

interface UploaderProps {
  accept: Accept | undefined;
  selectedFile: FileWithPath | null;
  setSelectedFile: (file: FileWithPreview | null) => void;
  aspect?: number;
  className?: string;
  maxSize?: number;
}
const Uploader = ({
  accept,
  selectedFile,
  setSelectedFile,
  aspect,
  className,
  maxSize = 1024 * 1024 * 5, // 5MB
}: UploaderProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<FileWithPreview | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });
      setFile(fileWithPreview);
    }
  }, [selectedFile]);

  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];

      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'The file you are trying to upload is too large.',
          variant: 'destructive',
        });
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize,
  });

  return (
    <div className={cn('relative', className)}>
      {selectedFile ? (
        <ImageCropper
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={file}
          setSelectedFile={setSelectedFile}
          aspect={aspect}
          className={className}
        />
      ) : (
        <div
          style={{
            aspectRatio: aspect,
          }}
          {...getRootProps()}
          className={cn(
            'w-full h-full relative cursor-pointer ring-offset-2 ring-2 ring-slate-200 rounded-sm',
          )}
        >
          <img
            src="/images/placeholder.svg"
            className="w-full h-full object-cover rounded-sm"
          />
          <input {...getInputProps()} />
        </div>
      )}
    </div>
  );
};

export default Uploader;
