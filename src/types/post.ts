import { IUser } from './user';

export interface IMedia extends File {
  id_media: string;
  type: string;
  media_link: string;
  caption: string;
}

export interface IPost extends IUser {
  id_post: string;
  medias?: IMedia[];
  target?: string;
  type?: string;
  description?: string;
  date_time?: Date;
  is_banned?: boolean;
  banned_reason?: string;
  loves?: number | string;
  commentLength: number;
}

export interface IComment extends IUser {
  id_comment?: string;
  id_post?: string;
  id_parent?: number | string;
  date_time?: Date;
  comment?: string;
  loves?: string;
  collapsed?: boolean;
  children?: IComment[];
  id_reply?: string;
  reply?: IComment;
}

export interface IPayloadCreatePost {
  id_user?: string;
  type?: string;
  target?: string;
  medias?: IMedia[];
  description?: string;
}
export interface IPayloadUpdatePost {
  id_user?: string;
  type?: string;
  target_update?: string;
  medias_update?: IMedia[];
  description_update?: string;
}

export interface IPayloadGetPost {
  id_user?: string;
  limit?: number;
  offset?: number;
}

export interface IPayloadCreateComment {
  id_user?: string;
  id_post?: string;
  id_parent?: string | number;
  id_reply?: string;
  comment: string;
}
export interface IPayloadEditComment extends IPayloadCreateComment {
  id_comment?: string | number;
}
export interface IPayloadDeleteComment {
  id_comment?: string | number;
  id_parent?: string | number;
}
