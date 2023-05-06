import { createClient } from './axios_client';
import {
  IPayloadAddMember,
  IPayloadChats,
  IPayloadCreateChat,
  IPayloadCreateRoom,
  IPayloadDleChats,
  IPayloadRooms,
  IPayloadSearchRoom,
  ISearchRoom
} from 'src/types/room';

const client = createClient();

export const messageApi = {
  getRooms: (params: IPayloadRooms) => {
    return client.get<any>(`/room/gets`, {
      params: params
    });
  },
  createRoom: (payload: IPayloadCreateRoom) => {
    return client.post<any>(`/room/create`, payload);
  },
  deleteRoom: (payload: { id_room: string }) => {
    return client.post<any>(`/room/delete`, payload);
  },
  addMembers: (payload: IPayloadAddMember) => {
    return client.post<any>(`/room/addMembers`, payload);
  },
  getUsersByIDRoom: (params: { id_room: string }) => {
    return client.get<ISearchRoom>(`/room/getUsersByIDRoom`, {
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
  deleteChats: (payload: IPayloadDleChats) => {
    return client.post<any>(`/chat/deletes`, payload);
  },
  createChat: (payload: IPayloadCreateChat) => {
    return client.post<any>(`/chat/create`, payload);
  },
  createFirstChat: (payload: IPayloadCreateChat) => {
    return client.post<any>(`/chat/createFirst`, payload);
  }
};
