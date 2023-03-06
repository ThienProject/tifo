import { IUser } from './user';

export interface IMedia {
  id_media: string;
  type_media: string;
  media_link: string;
  caption: string;
}


export interface IPost extends IUser {
  id_post: string;
  medias: IMedia[];
  target?: string;
  type?: string;
  description: string;
  date_time?: Date;
  is_banned?: boolean;
  banned_reason?: string;
  loves?: string;
  comments: IComment[];
}

export interface IComment extends IUser {
  id_comment?: string;
  id_post?: string;
  id_parent?: number;
  date_time?: Date;
  comment?: string;
  loves?: string;
  collapsed?: boolean;
  childNum: number;
}

export interface IPayloadCreatePost {
  id_user?: string;
  type?: string;
  target?: string;
  medias?: [];
  description?: string;
}

export interface IPayloadGetPost {
  id_user?: string;
  limit?: number;
  offset?: number;
}
