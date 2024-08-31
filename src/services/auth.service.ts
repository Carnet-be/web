import api from '@/lib/api';

export default {
  seller: {
    register: (data: any) =>
      api
        .post<AuthToken>('/auth/seller/register', data)
        .then((res) => res.data),
    login: (data: { email: string; password: string }) =>
      api.post<AuthToken>('/auth/seller/login', data).then((res) => res.data),
    logout: () => api.delete('/auth/seller/logout'),
    forgotPassword: (data: { email: string }) =>
      api.post('/auth/seller/forget-password', data),
    resetPassword: (data: { password: string; token: string }) =>
      api.post('/auth/seller/reset-password', data),
    sendEmailVerification: () =>
      api.post('/auth/seller/send-verification-email'),
  },
};
