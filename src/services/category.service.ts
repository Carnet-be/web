import api from '@/lib/api';
const resource = '/category';
export default {
  createCategory: ({
    name,
    description,
    image,
  }: {
    name: string;
    description?: string | null;
    image?: File;
  }) => {
    const formData = new FormData();
    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);

    return api.post<Category>(resource, formData).then((res) => res.data);
  },

  getCategories: () => api.get<Category[]>(resource).then((res) => res.data),

  updateCategory: ({
    id,
    data,
  }: {
    id: number;
    data: {
      name?: string;
      description?: string;
      image?: File;
    };
  }) => {
    const { name, description, image } = data;
    const formData = new FormData();
    if (name) formData.append('name', name);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image);

    return api
      .put<Category>(`${resource}/${id}`, formData)
      .then((res) => res.data);
  },

  deleteCategory: (id: number) =>
    api.delete(`${resource}/${id}`).then((res) => res.data),
};
