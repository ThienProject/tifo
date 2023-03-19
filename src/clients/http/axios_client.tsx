import axios, { AxiosError } from 'axios';
import { CPath } from 'src/constants';
import { toastMessage } from 'src/utils/toast';

export const createClient = () => {
  const baseURL = CPath.baseURL;

  const instance = axios.create({
    baseURL,
    timeout: 5000
    // headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.code === 'ECONNABORTED') {
        // handle timeout error
        toastMessage.error('Network is slow, please try again later!');
      }
      console.log(error);
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
      console.log(error);
      return Promise.reject(error);
    }
  );

  return instance;
};
