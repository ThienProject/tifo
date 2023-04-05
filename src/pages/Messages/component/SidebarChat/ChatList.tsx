import { Box, CardActionArea, CardMedia, Stack } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CPath } from 'src/constants';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { useAppDispatch } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { IGroup } from 'src/types/group';
import ChatItem from './ChatItem';

const ChatList = (props: { groups: IGroup[]; handleLoadMore: () => void }) => {
  const { groups, handleLoadMore } = props;

  return (
    <Box>
      {groups.length > 0 && (
        <InfiniteScroll
          dataLength={groups.length}
          next={handleLoadMore}
          hasMore={true}
          loader={<p>{groups.length > 0 ? /* 'Loading...' */ '' : 'No any post !'}</p>}
        >
          {groups.map((group) => {
            return <ChatItem key={group.id_group} group={group} />;
          })}
        </InfiniteScroll>
      )}
    </Box>
  );
};
{
  /* <PostItem index={index} key={post.id_post} post={post} />; */
}
export default ChatList;
