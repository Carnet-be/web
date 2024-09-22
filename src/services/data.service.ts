import api from '@/lib/api';

export default {
  getCities: (country: string | number) =>
    api
      .get<City[]>(`/data/cities?countryId=${country}`)
      .then((res) => res.data),
  getCountries: () => api.get('/data/countries').then((res) => res.data),
  getAllData: () =>
    api
      .get<{
        brands: Brand[];
        models: Model[];
        bodies: Bodies[];
        countries: Country[];
        cities: City[];
        carOptions: CarOption[];
      }>('/data/full-data')
      .then((res) => res.data),
};
