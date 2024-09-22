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
  updateCar: ({
    id,
    data,
    images,
  }: {
    id: number;
    data: Partial<Car>;
    images: File[];
  }) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    images.forEach((image) => formData.append('images', image));
    return api.put(`/car/${id}`, formData).then((res) => res.data);
  },
};
