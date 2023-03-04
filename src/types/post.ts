import { IUser } from './user';

export interface IMedia {
  id_media: string;
  type: string;
  link: string;
}
export interface IPost {
  id_post: string;
  user: IUser;
  medias: IMedia[];
  target?: string;
  type?: string;
  description: string;
  date_time?: string | Date;
  is_banned?: boolean;
  banned_reason?: string;
}
export interface IPayloadCreatePost {
  id_user?: string;
  type?: string;
  target?: string;
  medias?: FileList;
  description?: string;
}
