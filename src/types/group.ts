import { IUser } from './user';

export interface IChatDates {
  [date: string]: IChat[]
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
  chats?: IChat[];
}
