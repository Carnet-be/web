import api from '@/lib/api';

export default {
  me: () => api.get<Seller>('/seller/me').then((res) => res.data),
  updateSeller: (data: any) =>
    api.patch<Seller>('/seller', data).then((res) => res.data),
};
