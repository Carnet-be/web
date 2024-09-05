export {};

declare global {
  type Role = 'seller' | 'customer';
  type AuthToken = {
    role: Role;
    token: string;
  };

  type Seller = {
    id: string;
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
    } | null;
    shops: {
      id: string;
      name: string;
      uid: string;
      slug: string;
      logo: string;
    }[];
  };

  type Country = {
    id: string;
    name: string;
    cities?: City[];
  };

  type City = {
    id: string;
    name: string;
  };

  type Shop = {
    id: string;
    name: string;
    uid: string;
    slug: string;
    logo: string;
  };
}
