import api from '@/lib/api';

export default {
  getCities: (country: string | number) =>
    api
      .get<City[]>(`/data/cities?countryId=${country}`)
      .then((res) => res.data),
  getCountries: () => api.get('/data/countries').then((res) => res.data),
};
