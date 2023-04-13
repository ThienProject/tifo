import { IUser } from './user';
export interface IChatDates {
  [date: string]: IChat[];
}
export interface IChatGroup {
  [id_group: string]: IChatDates[];
}
export interface IChat extends IUser {
  id_chat?: string;
  message?: string;
  datetime: Date;
}
export interface IGroup {
  id_group?: string;
  avatar?: string;
  name?: string;
  users?: IUser[];
  chats?: IChatDates[];
}
export interface IPayloadSearchGroup {
  id_user?: string;
  q?: string;
  limit?: number;
  offset?: number;
}

export interface IPayloadGroups {
  id_user?: string;
  limit?: string | number;
  offset?: string | number;
}

export interface IPayloadGroup {
  id_me?: string;
  id_friend?: string;
}
export interface IPayloadChats {
  id_group?: string;
  limit?: string | number;
  offset?: string | number;
}

export interface IPayloadCreateChat {
  id_group?: string;
  id_user?: string;
  image?: string;
  message?: string;
}
