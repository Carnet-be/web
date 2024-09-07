import api from '@/lib/api';

export default {
  createShop: ({
    logo,
    cover,
    name,
    slug,
    description,
    phoneNumber,
    zipCode,
    address,
    cityId,
    countryId,
    sellerId,
  }: {
    logo?: File;
    cover?: File;
    name: string;
    slug: string;
    description?: string;
    phoneNumber?: string;
    zipCode?: string;
    address?: string;
    cityId: number;
    countryId: number;
    sellerId: string;
  }) => {
    const formData = new FormData();
    if (logo) formData.append('logo', logo);
    if (cover) formData.append('cover', cover);
    formData.append('name', name);
    formData.append('slug', slug);
    if (description) formData.append('description', description);
    if (phoneNumber) formData.append('phoneNumber', phoneNumber);
    if (zipCode) formData.append('zipCode', zipCode);
    if (address) formData.append('address', address);
    formData.append('countryId', countryId.toString());
    formData.append('cityId', cityId.toString());
    formData.append('sellerId', sellerId.toString());
    formData.append('cityId', cityId.toString());
    return api.post<Shop>('/shop', formData).then((res) => res.data);
  },
  checkSlugAvailability: (slug: string) =>
    api.get(`/shop/check-slug-availability/${slug}`).then((res) => res.data),
  getShop: (id: string) => api.get(`/shop/${id}`).then((res) => res.data),
  updateShop: (id: string, data: any) =>
    api.put(`/shop/${id}`, data).then((res) => res.data),
  deleteShop: (id: string) => api.delete(`/shop/${id}`).then((res) => res.data),
};
