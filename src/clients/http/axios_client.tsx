import axios, { AxiosError } from 'axios';
import { CPath } from 'src/constants';

export const createClient = () => {
  const baseURL = CPath.baseURL;

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
