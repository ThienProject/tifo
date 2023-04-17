import { createClient } from './axios_client';
import { IPayloadChats, IPayloadCreateChat, IPayloadRooms, IPayloadSearchRoom, ISearchRoom } from 'src/types/room';

const client = createClient();

export const messageApi = {
  getRooms: (params: IPayloadRooms) => {
    return client.get<any>(`/room/gets`, {
      params: params
    });
  },

  searchRoomOrUser: (params: IPayloadSearchRoom) => {
    return client.get<ISearchRoom>(`/room/search`, {
      params: params
    });
  },
  getChatsByIDroom: (params: IPayloadChats) => {
    return client.get('/room/getChatsByIDroom', {
      params
    });
  },
  getChats: (params: IPayloadRooms) => {
    return client.get<any>(`/chat/gets`, {
      params: params
    });
  },
  createChat: (payload: IPayloadCreateChat) => {
    return client.post<any>(`/chat/create`, payload);
  },
  createFirstChat: (payload: IPayloadCreateChat) => {
    return client.post<any>(`/chat/createFirst`, payload);
  }
};
