import { IUser } from './user';
export interface IChatDates {
  [date: string]: IChat[];
}
export interface IChatroom {
  [id_room: string]: IChatDates[];
}
export interface IChat extends IUser {
  id_chat?: string;
  message?: string;
  datetime: Date;
}

export interface IRoom {
  id_room?: string;
  type?: 'friend' | 'room' | 'chatbot';
  avatar?: string;
  name?: string;
  users?: IUser[];
  chats?: IChatDates[];
}
export interface IPayloadSearchRoom {
  id_user?: string;
  q?: string;
  limit?: number;
  offset?: number;
}
export interface ISearchRoom extends IUser {
  id_room?: string;
}
export interface IPayloadRooms {
  id_user?: string;
  limit?: string | number;
  offset?: string | number;
}
export interface IPayloadDleChats {
  id_user?: string;
  id_room?: string;
}

export interface IPayloadroom {
  id_me?: string;
  id_friend?: string;
}
export interface IPayloadChats {
  id_user?: string;
  id_room?: string;
  isChatbot?: boolean;
  limit?: string | number;
  offset?: string | number;
}

export interface IPayloadCreateChat {
  id_room?: string;
  id_user?: string;
  id_friend?: string;
  image?: string;
  message?: string;
  isChatbot?: boolean;
}
