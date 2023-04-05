import { IUser } from "./user";

export interface IChat {
  id_chat?: string;
  id_user?: string;
  message?: string;

}
export interface IGroup {
  id_group?: string;
  avatar?: string;
  name?: string;
  users: IUser[];
  chats?: IChat[];

}