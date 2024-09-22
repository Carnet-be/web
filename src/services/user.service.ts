import api from '@/lib/api';
import uploadService from './upload.service';
const resource = '/users';
export default {
  me: () => api.get<User>(`${resource}/me`).then((res) => res.data),
  updateUser: async (data: {
    user: Partial<User>;
    avatar?: File | string | null;
    id: number;
  }) => {
    if (data.avatar && typeof data.avatar !== 'string') {
      const key = await uploadService.uploadFile(data.avatar);
      data.user.avatar = key.key;
    }
    return api
      .put<User>(`${resource}/${data.id}`, data.user)
      .then((res) => res.data);
  },
  searchUsers: async (query: string) => {
    return api
      .get<ResponseData<User>>(`${resource}/search?${query}`)
      .then((res) => res.data);
  },
};
