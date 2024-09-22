import api from '@/lib/api';
const resource = '/users';
export default {
  me: () => api.get<User>(`${resource}/me`).then((res) => res.data),
  updateUser: (data: any) =>
    api.patch<User>(`${resource}`, data).then((res) => res.data),
};
