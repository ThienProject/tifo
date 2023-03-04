import axios, { AxiosError } from 'axios';
// const setClientToken = (accessToken: string, refreshToken: string) => {
//   if (accessToken) {
//     console.log('có', accessToken);
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
//     axios.defaults.headers.common['refreshToken'] = `Bearer ${refreshToken}`;
//   } else {
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

export const createClient = () => {
  const baseURL = 'http://localhost:8000/api/v1';

  const instance = axios.create({
    baseURL,
    timeout: 10000
    // headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    }
  );

  instance.interceptors.request.use(
    (config: any) => {
      const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;
      if (auth?.accessToken && auth?.refreshToken) {
        config.headers['Authorization'] = 'Bearer ' + auth.accessToken;
        config.headers['RefreshToken'] = 'Bearer ' + auth.refreshToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
