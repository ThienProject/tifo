import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import RoomItem from './RoomItem';
import { IChat, IRoom } from 'src/types/room';
import { useTranslation } from 'react-i18next';
import { getRoomsThunk } from 'src/redux_store/room/room_action';

const ChatList = () => {
  const rooms = useAppSelector((state) => state.roomSlice.rooms);
  const chats = useAppSelector((state) => state.roomSlice.chats);
  const { me, socket } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [isLoadMore, setIsLoadMore] = useState(true);
  const { t } = useTranslation();
  const handleLoadMore = (offset: number) => {
    const id_user = me?.id_user;
    const params = { id_user, limit: 10, offset: offset };
    if (id_user) {
      const action = getRoomsThunk(params);
      dispatch(action)
        .unwrap()
        .then((data) => {
          const { rooms } = data;
          if (!rooms || rooms.length === 0) {
            setIsLoadMore(false);
          }
        })
        .catch(() => {
          setIsLoadMore(false);
        });
    }
  };

  useEffect(() => {
    if (rooms.length <= 0) {
      handleLoadMore(0);
    }
  }, []);
  return (
    <Box>
      {rooms.length > 0 && (
        <InfiniteScroll
          height={400}
          dataLength={rooms.length}
          next={() => {
            handleLoadMore(rooms.length);
          }}
          hasMore={isLoadMore}
          loader={
            <Box height={0} textAlign={'center'}>
              <CircularProgress />
            </Box>
          }
          endMessage={<p style={{ fontSize: '14px', color: 'rgb(124 108 108)' }}>{t('room.empty')}</p>}
        >
          {rooms.map((room: IRoom) => {
            let chatDemo: string | undefined = 'say hello !';
            const chatsRoom = chats[room.id_room!];
            if ((chatsRoom && chatsRoom.length > 0) || room.type === 'chatbot') {
              if (chatsRoom) {
                const lastDateObj = chatsRoom[Object.keys(chatsRoom).length - 1];
                const dateArr = lastDateObj ? Object.values(lastDateObj) : [];
                const listMess = dateArr[dateArr.length - 1];
                if (listMess && listMess?.length) {
                  const lastChat: IChat = listMess[listMess.length - 1];
                  if (lastChat.type) {
                    chatDemo =
                      t('message.room_action.' + lastChat.type, {
                        actor: lastChat.username,
                        affected_username: lastChat?.affected_username
                      }) || '';
                  } else chatDemo = listMess[listMess.length - 1].message;
                }
              }
              return <RoomItem socket={socket} key={room.id_room} room={room} chatDemo={chatDemo} />;
            }
          })}
        </InfiniteScroll>
      )}
    </Box>
  );
};
export default ChatList;
