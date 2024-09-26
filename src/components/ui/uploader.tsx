import { cn, getImageUrl } from '@/lib/utils';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { Accept, FileWithPath, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { FileWithPreview, ImageCropper } from './image-crop';
import { useToast } from './use-toast';
// Import useTranslate hook

interface UploaderProps {
  accept: Accept | undefined;
  selectedFile: FileWithPath | null;
  setSelectedFile: (file: FileWithPreview | null) => void;
  aspect?: number;
  className?: string;
  maxSize?: number;
  defaultPreview?: string | null;
}
const Uploader = ({
  accept,
  selectedFile,
  setSelectedFile,
  aspect,
  className,
  maxSize = 1024 * 1024 * 5, // 5MB
  defaultPreview,
}: UploaderProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [preview, setPreview] = useState<string | undefined | null>(
    defaultPreview,
  );

  const { t: c } = useTranslation(); // Use the useTranslate hook
  const t = (key: string, defaultValue: string) =>
    c('common.' + key, defaultValue);

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
          title: t('fileTooLargeTitle', 'File too large'),
          description: t(
            'fileTooLargeDescription',
            'The file you are trying to upload is too large.',
          ),
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

  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
    setFile(null);

    setIsPopoverOpen(false);
  };

  const handleReplace = () => {
    setIsPopoverOpen(false);
    // Trigger file input click
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

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
        <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
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
                src={getImageUrl(preview)}
                className="w-full h-full object-cover rounded-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!preview && !selectedFile) {
                    handleReplace();
                  } else {
                    setIsPopoverOpen(true);
                  }
                }}
              />
              <input {...getInputProps()} />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <h3 className="text-sm font-bold">
                {t('imageOptionsTitle', 'Opciones de imagen')}
              </h3>
              <p className="text-sm mt-2 mb-4">
                {t(
                  'imageOptionsDescription',
                  '¿Quieres eliminar o reemplazar la imagen actual?',
                )}
              </p>
              <div className="flex gap-2">
                <Button color="danger" size="sm" onClick={handleRemove}>
                  {t('removeButton', 'Eliminar')}
                </Button>
                <Button color="primary" size="sm" onClick={handleReplace}>
                  {t('replaceButton', 'Reemplazar')}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default Uploader;
