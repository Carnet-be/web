import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (
  key?: string | null,
  placeholder: string | undefined = '/images/placeholder.svg',
) =>
  key
    ? `https://fitrack.blr1.cdn.digitaloceanspaces.com/carnet/${key}`
    : placeholder;
