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
    isEmailVerified?: boolean;
    state: 'active' | 'inactive' | 'banned' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
  };
}
