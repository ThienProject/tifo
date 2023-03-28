import { Box, CardActionArea, CardMedia, Stack } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CPath } from 'src/constants';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail';
import { useAppDispatch } from 'src/redux_store';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { IPost } from 'src/types/post';

const PostList = (props: { posts: IPost[]; handleLoadMore: () => void }) => {
  const { posts, handleLoadMore } = props;

  return (
    <Box>
      {posts.length > 0 && (
        <InfiniteScroll
          dataLength={posts.length}
          next={handleLoadMore}
          hasMore={true}
          loader={<p>{posts.length > 0 ? /* 'Loading...' */ '' : 'No any post !'}</p>}
        >
          <Stack flexDirection={'row'} gap={1} flexWrap={'wrap'}>
            {posts.map((post, index) => {
              return (
                <Box
                  key={index}
                  width={'30%'}
                  bgcolor={'#888'}
                  onClick={() => {
                    // const model_id = MODAL_IDS.postDetail;
                    // const action = openModal({ modalId: model_id, dialogComponent: <PostDetail post={post} /> });
                    // dispatch(action);
                  }}
                >
                  {post?.medias && (
                    <CardActionArea>
                      <CardMedia
                        // sx={sx}
                        sx={{
                          height: 300
                        }}
                        component={post.medias[0].type === 'video' ? 'video' : 'img'}
                        alt='media'
                        src={CPath.host_public + post.medias[0].media_link}
                        title={post.medias[0].type}
                      />
                    </CardActionArea>
                  )}
                  {/* <img alt={post.id_post} src={CPath.host_public + (post?.medias ? post.medias[0].media_link : '')} /> */}
                </Box>
              );
            })}
          </Stack>
        </InfiniteScroll>
      )}
    </Box>
  );
};
{
  /* <PostItem index={index} key={post.id_post} post={post} />; */
}
export default PostList;
