import { IUser } from "./user";

export interface IMedia {
  id_media: string,
  type: string,
  link: string
}
export interface IPost {
  id_post: string;
  user: IUser;
  medias: IMedia[];
  description: string;
  time: string;
}