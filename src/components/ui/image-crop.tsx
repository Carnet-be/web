'use client';

import React, { type SyntheticEvent } from 'react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from 'react-image-crop';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';
import { CropIcon, Trash2Icon } from 'lucide-react';
import { FileWithPath } from 'react-dropzone';
import 'react-image-crop/dist/ReactCrop.css';
export type FileWithPreview = FileWithPath & {
  preview: string;
};
interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: FileWithPreview | null;
  setSelectedFile: (file: FileWithPreview | null) => void;
  aspect?: number;
  className?: string;
}

export function ImageCropper({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
  aspect = 1,
  className,
}: ImageCropperProps) {
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>('');
  const [croppedImage, setCroppedImage] = React.useState<string>('');

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    }

    return canvas.toDataURL('image/png', 1.0);
  }

  async function onCrop() {
    try {
      setCroppedImage(croppedImageUrl);
      setDialogOpen(false);
    } catch (error) {
      alert('Something went wrong!');
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className={'size-full'}>
        <div
          style={{
            aspectRatio: aspect,
          }}
          className={cn(
            'w-full relative cursor-pointer ring-offset-2 ring-2 ring-slate-200 rounded-sm',
            className,
          )}
        >
          <img
            src={croppedImage ? croppedImage : selectedFile?.preview}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="p-4 gap-2">
        <div className="p-4 size-full">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => onCropComplete(c)}
            aspect={aspect}
            className="w-full"
          >
            <div className="w-full h-full relative">
              <img
                ref={imgRef}
                className="object-contain w-full h-full"
                alt="Image Cropper Shell"
                src={selectedFile?.preview}
                onLoad={onImageLoad}
              />
            </div>
          </ReactCrop>
        </div>
        <DialogFooter className="p-1 pt-0 justify-center ">
          <DialogClose asChild>
            <Button
              size={'sm'}
              type="reset"
              className="w-fit"
              variant={'outline'}
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <Trash2Icon className="mr-1.5 size-4" />
              Remove
            </Button>
          </DialogClose>
          <Button type="submit" size={'sm'} className="w-fit" onClick={onCrop}>
            <CropIcon className="mr-1.5 size-4" />
            Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to center the crop
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
