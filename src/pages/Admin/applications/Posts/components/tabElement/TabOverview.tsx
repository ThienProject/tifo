import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import CustomTypography from 'src/components/CustomTypography';
import MODAL_IDS from 'src/constants/modal';
import PostDetail from 'src/pages/PostDetail/PostDetail';
import { useAppDispatch } from 'src/redux_store';
import { getPostThunk } from 'src/redux_store/admin/admin_action';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { IPostAdmin } from 'src/types/post';
import ItemReported from '../ItemReported';
import Scrollbars from 'react-custom-scrollbars-2';

const Overview = ({ id_post }: { id_post: string }) => {
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<IPostAdmin>();
  const myRef = useRef();
  // console.log(post);
  useEffect(() => {
    fetchApi(id_post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApi = (id_post: string) => {
    const action = getPostThunk({ id_post });
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { post } = data;
        if (post) {
          setPost(post);
        }
      });
  };

  return (
    <Box sx={{ overflowY: 'hidden', maxHeight: '100%' }}>
      <Box sx={{ mb: 1 }}>
        <Typography fontSize={14} variant='body1'>
          Create date
        </Typography>
        <Typography fontSize={12} variant='body2'>
          {moment(post?.datetime).format('DD-MM-YYYY')}
        </Typography>
      </Box>
      <Card sx={{ p: 1, mb: 1 }}>
        <CardContent sx={{ p: 0, ml: 1 }}>
          <Box ref={myRef}>
            <Typography fontSize={13} variant='body1'>
              Description:
            </Typography>
            {post?.description && (
              <CustomTypography
                myRef={myRef}
                mt={2}
                textAlign={'justify'}
                fontSize={14}
                fontWeight={550}
                text={post.description}
                max={50}
              />
            )}
          </Box>
          <Box mt={1} display={'flex'} alignItems={'center'}>
            <Button
              onClick={() => {
                if (post) {
                  const action = openModal({
                    modalId: MODAL_IDS.postDetail,
                    dialogComponent: <PostDetail post={post!} />
                  });
                  dispatch(action);
                }
              }}
              sx={{ color: '#fff', fontSize: 13, textTransform: 'capitalize' }}
              variant='contained'
            >
              view detail post
            </Button>
          </Box>
        </CardContent>
      </Card>

      {post?.reports && (
        <Box>
          <Typography color={'red'} fontSize={15}>
            Reports
          </Typography>
          {post.reports.map((report) => (
            <ItemReported key={report.id_user} report={report} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Overview;
