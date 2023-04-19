import axios, { AxiosError } from 'axios';
import { CPath } from 'src/constants';
import { toastMessage } from 'src/utils/toast';
import i18n from 'src/configs/translations';
import store from 'src/redux_store';
import { logout } from 'src/redux_store/user/user_slice';
export const createClient = () => {
  const baseURL = CPath.baseURL;
  const t = i18n.t;
  const instance = axios.create({
    baseURL,
    timeout: 20000
    // headers: { 'Content-Type': 'application/json' }
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.code === 'ECONNABORTED') {
        // handle timeout error
        toastMessage.error(t('toast.netWorkSlow'));
      }
      if ((error as any)?.response?.data?.code == '401') {
        toastMessage.error(t('toast.timeOutLogin'));
        store.dispatch(logout());
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
