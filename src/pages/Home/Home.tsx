import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import ListFriends from './components/ListFriends';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostItem from './components/PostItem';
import { IPost } from 'src/types/post';
import images from 'src/assets/images';

const Home = () => {
  const items: IPost[] = [
    {
      id_post: '1',
      description: 'Phamj vanw thien chao don ngay moi !',
      user: {
        id_user: '1',
        username: 'sybuivan',
        fullname: 'Phamj vawn Thien',
        avatar: images.full_Logo_black
      },
      medias: [
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        },
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        }
      ],
      time: '12:12:2022'
    },
    {
      id_post: '2',
      description: 'Phamj vanw thien chao don ngay moi !',
      user: {
        id_user: '1',
        username: 'sybuivan',
        fullname: 'Phamj vawn Thien',
        avatar: images.full_Logo_black
      },
      medias: [
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        },
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        }
      ],
      time: '12:12:2022'
    },
    {
      id_post: '3',
      description: 'Phamj vanw thien chao don ngay moi !',
      user: {
        id_user: '1',
        username: 'sybuivan',
        fullname: 'Phamj vawn Thien',
        avatar: images.full_Logo_black
      },
      medias: [
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        },
        {
          id_media: '1',
          type: '1',
          link: images.full_Logo_white
        }
      ],
      time: '12:12:2022'
    }
  ];
  const [posts, setPosts] = useState(items);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setPosts(posts.concat(items));
    }, 1500);
  };

  return (
    <Grid>
      <Grid item lg={6}>
        <Box mt={3} height={100} color={'common.black'}>
          <ListFriends />
          <Box mt={3}>
            <Box>
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
              >
                {posts.map((post, index) => {
                  return <PostItem key={`post.id_post + ${index} ${Math.random()}`} post={post} />;
                })}
              </InfiniteScroll>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6}></Grid>
    </Grid>
  );
};

export default Home;
