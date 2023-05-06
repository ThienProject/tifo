import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from 'src/redux_store';
import RoomItem from './RoomItem';
import { IChat, IRoom } from 'src/types/room';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars-2';

const ChatList = () => {
  const rooms = useAppSelector((state) => state.roomSlice.rooms);
  const chats = useAppSelector((state) => state.roomSlice.chats);
  const socket = useAppSelector((state) => state.userSlice.socket);
  const { t } = useTranslation();
  const handleLoadMore = () => {
    // setrooms(fakerooms);
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  return (
    <Box height={'70vh'}>
      <Scrollbars
        renderThumbVertical={({ style, ...props }) => {
          const thumbStyle = {
            backgroundColor: '#d8d3d333'
          };
          return <div style={{ ...style, ...thumbStyle }} {...props} />;
        }}
      >
        {rooms.length > 0 && (
          <InfiniteScroll
            dataLength={rooms.length}
            next={handleLoadMore}
            hasMore={true}
            loader={<p>{rooms.length > 0 ? /* 'Loading...' */ '' : 'No any post !'}</p>}
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
      </Scrollbars>
    </Box>
  );
};
export default ChatList;
