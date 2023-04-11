import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppSelector } from 'src/redux_store';
import GroupItem from './GroupItem';
import { IGroup } from 'src/types/group';

const ChatList = () => {
  const groups = useAppSelector((state) => state.groupSlice.groups);
  const chats = useAppSelector((state) => state.groupSlice.chats);
  const handleLoadMore = () => {
    // setGroups(fakeGroups);
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
  return (
    <Box>
      {groups.length > 0 && (
        <InfiniteScroll
          dataLength={groups.length}
          next={handleLoadMore}
          hasMore={true}
          loader={<p>{groups.length > 0 ? /* 'Loading...' */ '' : 'No any post !'}</p>}
        >
          {groups.map((group: IGroup) => {
            let chatDemo = 'say hello !';
            if (group.id_group) {
              const lastDateObj = chats[group.id_group][Object.keys(chats[group.id_group]).length - 1];
              const dateArr = lastDateObj ? Object.values(lastDateObj) : [];
              const listMess = dateArr[dateArr.length - 1];
              chatDemo = listMess[listMess.length - 1].message;
              console.log('lastDateObj', lastDateObj);
              console.log('messageArr', listMess);
              console.log('chatDemo', chatDemo);
            }
            return <GroupItem key={group.id_group} group={group} chatDemo={chatDemo} />;
          })}
        </InfiniteScroll>
      )}
    </Box>
  );
};
export default ChatList;
