export interface IUser {
  id_user?: string;
  username?: string;
  fullname?: string;
  age?: string;
  phone?: string;
  email?: string;
  address?: string;
  gender?: string;
  avatar?: string;
  posts?: number;
  followers?: number;
  followings?: number;
}
export interface IUserChat extends IUser {
  id_room?: string;
  room_avatar?: string;
  name?: string;
}
