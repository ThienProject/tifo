import { IUser } from './user';
export interface IChatDates {
  [date: string]: IChat[];
}
export interface IChatGroup {
  [id_group: string]: IChatDates[]
}
export interface IChat {
  id_chat?: string;
  id_user?: string;
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
export interface IPayloadGroups {
  id_user?: string;
  limit?: string | number;
  offset?: string | number;
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
