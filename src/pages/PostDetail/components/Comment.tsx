import React, { SetStateAction, useState } from 'react';
import { Box, Divider, Button, Stack, IconButton, SxProps, Paper, Input } from '@mui/material';
import UserItem from 'src/components/items/UserItem';
import { IComment } from 'src/types/post';
import Typography from '@mui/material/Typography';
import { IUser } from 'src/types/user';
import { getTimeFromDay } from 'src/functions';
import { FavoriteBorder, Favorite, SendRounded } from '@mui/icons-material';
import { FormInput } from 'src/components/hooks_form/form_input';
const ItemComment = (props: {
  setCommentList?: React.Dispatch<SetStateAction<IComment[]>>;
  comment: IComment;
  sx?: SxProps;
  parentName?: string;
}) => {
  const { setCommentList, comment, sx, parentName } = props;
  const { fullname, username, id_user, avatar, date_time, loves } = comment;
  const user = { fullname, username, id_user, avatar };
  const [isLove, setIsLove] = useState(false);
  return (
    <Box sx={sx} my={2}>
      <Paper sx={{ ml: 1, p: 2, pr: 5, borderRadius: 4, width: 'fit-content' }} elevation={3}>
        <Stack alignItems={'center'} direction={'row'}>
          <UserItem size='small' user={user} />
          {parentName && (
            <Typography fontSize={13} fontWeight={100} color={'blue'} mr={1}>
              {'@' + parentName} {/* Nhắc lại  */}
            </Typography>
          )}
          <Typography fontSize={13} fontWeight={100}>
            {comment.comment}
          </Typography>
        </Stack>
      </Paper>

      <Stack ml={2} alignItems={'center'} direction={'row'}>
        <Typography fontSize={13} color={'text.secondary'} mr={2}>
          {date_time && getTimeFromDay(date_time)}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mr: 0.5 }}>{loves} likes</Typography>
        <Button
          sx={{ mr: 1, textTransform: 'capitalize', fontSize: 13, color: 'text.secondary' }}
          onClick={() => {
            setCommentList &&
              setCommentList((prev: IComment[]) => {
                const index = prev.findIndex((item) => {
                  return item.id_comment === comment.id_comment;
                });
                const newCmtList = [...prev];
                newCmtList[index].collapsed = !comment.collapsed;
                return newCmtList;
              });
          }}
        >
          {/* comment.childNum > 0 && */ !comment.collapsed ? 'View replies' : 'Hide replies'}
        </Button>
        <IconButton
          onClick={() => {
            setIsLove(!isLove);
          }}
        >
          {isLove ? <Favorite sx={{ fontSize: 13 }} color='error' /> : <FavoriteBorder sx={{ fontSize: 13 }} />}
        </IconButton>
      </Stack>
    </Box>
  );
};
const Comment = (props: { comments: IComment[] }) => {
  const { comments } = props;

  const [commentList, setCommentList] = useState(comments);
  return (
    <Stack height={'100%'}>
      <Box sx={{ overflowY: 'scroll' }}>
        {commentList.map((comment, index) => {
          return (
            <Box key={comment.id_comment}>
              {comment.id_parent == 0 && (
                <Box>
                  <ItemComment setCommentList={setCommentList} comment={comment} />
                  <Box ml={4}>
                    {commentList.map((commentChild) => {
                      if (commentChild.id_parent === comment.id_comment)
                        if (comment.collapsed) {
                          return (
                            <ItemComment
                              setCommentList={setCommentList}
                              parentName={comment.username}
                              key={commentChild.id_comment}
                              comment={commentChild}
                            />
                          );
                        }
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <Stack flexDirection={'row'}>
        <Input fullWidth />
        <IconButton>
          <SendRounded color='info' />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Comment;
