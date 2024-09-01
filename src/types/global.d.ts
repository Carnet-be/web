export {};

declare global {
  type Role = 'seller' | 'customer';
  type AuthToken = {
    role: Role;
    token: string;
  };
}
