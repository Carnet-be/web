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

export const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const getPrice = ({
  maxPrice,
  minPrice,
  inRange,
  price,
}: {
  inRange: boolean | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  price?: number | null;
}) => {
  if (inRange && minPrice && maxPrice) {
    return `${priceFormatter.format(minPrice)} - ${priceFormatter.format(
      maxPrice,
    )}`;
  }
  if (price) {
    return priceFormatter.format(price);
  }
  return undefined;
};

export const transformNullToUndefined = (value: Object) =>
  Object.fromEntries(
    Object.entries(value).map(([key, value]) => [
      key,
      value === null ? undefined : value,
    ]),
  );

export const getProfileInfo = (user: User) => {
  if (user.garage) {
    return {
      name: user.garage.name,
      description: `@${user.garage.slug}`,
      image: getImageUrl(user.garage.logo),
    };
  }
  return {
    name: `${user.firstName} ${user.lastName}`,
    description: user.email,
    image: getImageUrl(user.avatar),
  };
};
