import axios, { AxiosError } from 'axios';

export const getClientToken = () => {
  return axios.defaults.headers.common['Authorization'];
};

export const setClientToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = () => {
  const baseURL = 'http://localhost:5000/api/v1';

  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
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
      config.headers = {
        // Authorization: getClientToken(),
        ...config.headers
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
