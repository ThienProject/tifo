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
  type?: 'post' | 'reel';
  description?: string;
  date_time?: Date;
  is_banned?: boolean;
  banned_reason?: string;
  loves?: number | string;
  isLove?: boolean;
  isSave?: boolean;
  commentLength: number;
}
export interface IReport {
  username?: string;
  id_user?: string;
  reason?: string;
  avatar?: string;
  datetime?: string;
}
export interface IPostAdmin extends IPost {
  reports_quantity?: number;
  reports?: IReport[];
  status?: 'reported' | 'active' | 'banned';
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
  type?: 'reel' | 'post';
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

export interface IUpdateLove {
  id_post: string;
  id_user: string;
  isLove: boolean;
  type?: 'reel' | 'post';
}
export interface IUpdateSave {
  id_post: string;
  id_user: string;
  isSave: boolean;
  type?: 'reel' | 'post';
}
