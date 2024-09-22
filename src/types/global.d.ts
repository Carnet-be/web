export {};

declare global {
  type Role = 'seller' | 'customer';
  type AuthToken = {
    role: Role;
    token: string;
  };

  type User = {
    id: number;
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    username?: string;
    phoneNumber?: string;
    isEmailVerified?: boolean;
    state: 'active' | 'inactive' | 'banned' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
    isGarage?: boolean;
    garage: Garage | null;
  };

  type Country = {
    id: number;
    name: string;
    cities?: City[];
  };

  type City = {
    id: number;
    countryId: number;
    name: string;
  };

  type Garage = {
    id: number;
    uid: string;
    name: string;
    slug: string;
    logo?: string;
    cover?: string;
    description?: string;
    phoneNumber?: string;
    website?: string;
    countryId?: number;
    cityId?: number;
    address?: string;
    zipCode?: string;
    userId: number;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    state: 'active' | 'draft';
    createdAt: Date;
    updatedAt?: Date;
  };

  type Car = {
    id: number;
    uid: string;
    brandId: number;
    modelId: number;
    bodyId: number;
    name: string;
    description?: string;
    year: number;
    color?: string;
    fuel: 'diesel' | 'gasoline' | 'electric' | 'hybrid';
    isNew: boolean;
    price: number;
    countryId: number;
    cityId: number;
    address?: string;
    lat?: number;
    lon?: number;
    phoneNumber?: string;
    zipCode?: string;
    handling?: number;
    tires?: number;
    exterior?: number;
    interior?: number;
    transmission: 'manual' | 'automatic' | 'semi-automatic';
    doors: '2' | '3' | '4' | '5' | '6' | '7' | '8';
    cv?: number;
    cc?: number;
    co2?: number;
    kilometrage: number;
    version?: string;
    images?: string[];
    isAuction: boolean;
    minPrice?: number;
    maxPrice?: number;
    createdAt: Date;
    updatedAt: Date;
    state: 'active' | 'draft' | 'deleted';
    images?: string[];
    options?: CarOption[];
  };

  type CarOption = {
    id: number;
    name: string;
    translatedName?: Record<string, string>;
    createdAt: Date;
  };

  type Bodies = {
    id: number;
    name: string;
    translatedName?: Record<string, string>;
    logo?: string;
    createdAt: Date;
  };

  type Model = {
    id: number;
    name: string;
    translatedName?: Record<string, string>;
    brandId: number;
    createdAt: Date;
  };

  type Brand = {
    id: number;
    name: string;
    translatedName?: Record<string, string>;
    countryId?: number;
    logo?: string;
    createdAt: Date;
  };
}
