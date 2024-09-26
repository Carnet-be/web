import api from '@/lib/api';
import uploadService from './upload.service';

export default {
  createCar: async ({
    data,
    images,
  }: {
    data: Partial<Car>;
    images: (File | string)[];
  }) => {
    const files = images?.filter((i) => typeof i !== 'string');
    const uploadedImages = images?.filter((i) => typeof i === 'string');
    const keys = await uploadService.uploadFiles(files as File[]);
    const { options, ...rest } = data;
    return api
      .post('/car', {
        car: { ...rest, images: [...(uploadedImages || []), ...keys] },
        options,
      })
      .then((res) => res.data);
  },
  getCar: (id: number) => api.get(`/car/${id}`).then((res) => res.data),
  updateCar: async ({
    id,
    data,
    images,
  }: {
    id: number;
    data: Partial<Car>;
    images?: (File | string)[];
  }) => {
    const files = images?.filter((i) => typeof i !== 'string');
    const uploadedImages = images?.filter((i) => typeof i === 'string');
    const keys = await uploadService.uploadFiles(files as File[]);
    const { options, ...rest } = data;
    return api
      .put(`/car/${id}`, {
        car: { ...rest, images: [...(uploadedImages || []), ...keys] },
        options,
      })
      .then((res) => res.data);
  },
  mine: async () => api.get<Car[]>('/car/mine').then((res) => res.data),

  search: async (params: {
    garageSlug?: string;
    garageId?: string | number;
    garageUid?: string;
    brandId?: string | number;
    bodyId?: string | number;
    modelId?: string | number;
    query?: string;
    minPrice?: string | number;
    maxPrice?: string | number;
    minYear?: string | number;
    maxYear?: string | number;
    year?: string | number;
    limit?: number;
    page?: number;
    status?: string;
    uid?: string;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    return api
      .get<ResponseData<Car>>(`/car/search?${queryParams.toString()}`)
      .then((res) => res.data);
  },
  updateCarStatus: async ({
    id,
    status,
  }: {
    id: number;
    status: Car['status'];
  }) => {
    return api.patch(`/car/${id}/status`, { status }).then((res) => res.data);
  },
};
