export {};

declare global {
  type Role = 'seller' | 'customer';
  type AuthToken = {
    role: Role;
    token: string;
  };

  type Seller = {
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
    selectedShop: {
      id: string;
      name: string;
      uid: string;
      slug: string;
      logo: string;
    };
    shops: {
      id: string;
      name: string;
      uid: string;
      slug: string;
      logo: string;
    }[];
  };

  type Country = {
    id: number;
    name: string;
    cities?: City[];
  };

  type City = {
    id: number;
    name: string;
  };

  type Shop = {
    id: string;
    name: string;
    uid: string;
    slug: string;
    logo: string;
  };

  type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    images: string[];
  };

  type Category = {
    id: number;
    uid: string;
    parentId?: number | null;
    name: string;
    image?: string | null;
    description?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    products?: Product[];
    items?: Category[];
    productsCount?: number;
  };
}
