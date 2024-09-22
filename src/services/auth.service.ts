import api from '@/lib/api';

export default {
  seller: {
    register: (data: any) =>
      api.post<AuthToken>('/auth/register', data).then((res) => res.data),
    login: (data: { email: string; password: string }) =>
      api.post<AuthToken>('/auth/login', data).then((res) => res.data),
    logout: () => api.delete('/auth/logout'),
    forgotPassword: (data: { email: string }) =>
      api.post('/auth/forget-password', data),
    resetPassword: (data: { password: string; token: string }) =>
      api.post('/auth/reset-password', data),
    sendEmailVerification: () => api.post('/auth/send-verification-email'),
  },
};
