import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from 'src/redux_store';
import RoomItem from './RoomItem';
import { IRoom } from 'src/types/room';

const ChatList = () => {
  const rooms = useAppSelector((state) => state.roomSlice.rooms);
  const chats = useAppSelector((state) => state.roomSlice.chats);
  const handleLoadMore = () => {
    // setrooms(fakerooms);
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  return (
    <Box>
      {rooms.length > 0 && (
        <InfiniteScroll
          dataLength={rooms.length}
          next={handleLoadMore}
          hasMore={true}
          loader={<p>{rooms.length > 0 ? /* 'Loading...' */ '' : 'No any post !'}</p>}
        >
          {rooms.map((room: IRoom) => {
            let chatDemo: string | undefined = 'say hello !';
            if (room.id_room && chats[room.id_room]) {
              const lastDateObj = chats[room.id_room][Object.keys(chats[room.id_room]).length - 1];
              const dateArr = lastDateObj ? Object.values(lastDateObj) : [];
              const listMess = dateArr[dateArr.length - 1];
              chatDemo = listMess && listMess?.length ? listMess[listMess.length - 1].message : '';
            }
            return <RoomItem key={room.id_room} room={room} chatDemo={chatDemo} />;
          })}
        </InfiniteScroll>
      )}
    </Box>
  );
};
export default ChatList;
