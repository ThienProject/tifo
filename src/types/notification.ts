export interface INotification {
  id_notification?: string;
  type: string;
  id_post?: string;
  avatar?: string;
  id_user?: string;
  id_actor?: string;
  fullname?: string;
  username?: string;
  is_seen?: boolean;
  content?: string;
  id_follow?: string;
  datetime?: string;
}
export interface IPayloadNoti {
  id_user: string;
  limit?: number;
  offset?: number;
  sort?: 'desc' | 'asc';
  time?: string;
  category?: string;
}
