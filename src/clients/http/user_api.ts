import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { createClient } from './axios_client';

const client = createClient();

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    console.log({ payload });
    //any = dữ liệu backend trả về
    return client.post<any>('/auth/register', payload);
  }
};
