import { useTranslation } from 'react-i18next';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { useAppSelector } from 'src/redux_store';
import { IRoom } from 'src/types/room';

const useChatItem = (room: IRoom) => {
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  const chatItem = {
    avatar: '',
    name: '',
    username: '',
    id_user: '',
    id_room: '',
    type: room?.type,
    isOnline: false,
    isOwner: false,
    off_time: new Date()
  };
  if (room?.type === 'friend' || room?.type === 'chatbot') {
    if (room.users && room.users.length > 0) {
      if (me?.id_user) {
        const friend = room.users.find((u) => u.id_user != me?.id_user);
        if (friend) {
          chatItem.avatar = friend.avatar ? CPath.host_user + friend.avatar : images.account;
          chatItem.name = friend.fullname || '';
          chatItem.isOnline = !me?.invisible && !friend?.invisible && friend?.status === 'online';
          chatItem.off_time = friend.off_time;
          chatItem.username = friend.username;
          chatItem.id_user = friend.id_user;
        }
      }
    } else {
      chatItem.avatar = images.account;
      chatItem.name = t('user.invalid')!;
      chatItem.type = undefined;
    }
  } else if (room?.type === 'group') {
    chatItem.avatar = room?.avatar ? CPath.host_user + room.avatar : images.roomDefault;
    chatItem.name = room?.name || '';
    chatItem.isOwner = room?.users?.some((u) => u.role === 1 && u.id_user === me?.id_user);
    chatItem.id_room = room.id_room;
  } else {
    if (room?.type === 'new-chat') {
      chatItem.avatar = room.users[0].avatar;
      chatItem.name = room.users[0].fullname;
    }
  }
  return chatItem;
};

export default useChatItem;
