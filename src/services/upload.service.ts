import api from '@/lib/api';

export default {
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData).then((res) => res.data);
  },
  uploadFiles: (files: File[]) => {
    if (files.length === 0) return [];
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    return api.post('/upload/multiple', formData).then((res) => res.data.keys);
  },
};
