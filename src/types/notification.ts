export interface INotification {
  id_notification?: string,
  type: string,
  id_post?: string,
  avatar?: string,
  id_user?: string,
  id_actor?: string,
  fullname?: string,
  username?: string,
  is_seen?: boolean,
  content?: string
}