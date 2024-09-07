import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (
  key?: string,
  placeholder: string | undefined = '/images/placeholder.svg',
) =>
  key
    ? `https://okeyo.ams3.cdn.digitaloceanspaces.com/seller/${key}`
    : placeholder;
export const getVideoUrl = (key?: string) =>
  key
    ? `https://okeyo.ams3.cdn.digitaloceanspaces.com/seller/${key}`
    : undefined;
