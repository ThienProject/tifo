export interface IUser {
  follow?: 'accept' | 'waiting' | null;
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
  cover?: string;
  description?: string;
}
export interface IUserChat extends IUser {
  id_room?: string;
  room_avatar?: string;
  name?: string;
}
export interface IPayloadFollow {
  id_noti?: string;
  id_follower?: string;
  id_user?: string;
}
