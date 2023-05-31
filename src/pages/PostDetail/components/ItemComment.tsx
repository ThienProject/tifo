import React, { SetStateAction, useState } from 'react';
import { Box, Button, Stack, IconButton, SxProps, Paper } from '@mui/material';
import UserItem from 'src/components/items/UserItem';
import { IComment } from 'src/types/post';
import Typography from '@mui/material/Typography';
import { getTimeFromDay } from 'src/functions';
import { FavoriteBorder, Favorite, MoreHoriz } from '@mui/icons-material';
import MenuOption from 'src/components/MenuOption';
import ProtectBox from 'src/components/ProtectBox';
import { useAppDispatch } from 'src/redux_store';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import MODAL_IDS from 'src/constants/modal';
import { useTranslation } from 'react-i18next';

const ItemComment = (props: {
  setCommentList?: React.Dispatch<SetStateAction<IComment[]>>;
  comment: IComment;
  sx?: SxProps;
  replyName?: string;
  indexCmt?: number;
  setPayload?: () => void;
  updateComment?: (value?: string) => void;
  deleteComment?: () => void;
}) => {
  const { setCommentList, comment, sx, replyName, indexCmt, setPayload, deleteComment, updateComment } = props;
  const { fullname, username, id_user, avatar, date_time, loves } = comment;
  const user = { fullname, username, id_user, avatar };
  const [isLove, setIsLove] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        ...sx
      }}
      my={1}
    >
      <Paper
        sx={{
          ml: 1,
          p: 2,
          pr: 5,
          borderRadius: 2,
          maxWidth: '88%',
          position: 'relative',
          '&:hover .optionCmt': {
            display: 'block'
          }
        }}
        elevation={3}
      >
        <Stack alignItems={'center'} direction={'row'}>
          <Box
            onClick={() => {
              const action = closeModal({ modalId: MODAL_IDS.postDetail });
              dispatch(action);
            }}
          >
            <UserItem to={`/${user.id_user}`} size='small' user={user} />
          </Box>

          <Box mb={0} width={'100%'} display={'flex'} alignItems='center'>
            {replyName && (
              <Typography fontSize={13} fontWeight={100} color={'blue'} mr={1}>
                {'@' + replyName} {/* Nhắc lại  */}
              </Typography>
            )}
            <Typography sx={{ p: 0, mb: 0, width: '85%', overflowWrap: 'break-word' }}>{comment.comment}</Typography>
          </Box>
        </Stack>
        {
          <ProtectBox id_owner={comment.id_user}>
            <Box>
              <MenuOption
                anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'right'
                }}
                classIcon='optionCmt'
                sxIcon={{ display: 'none', position: 'absolute', right: -40, top: '25%' }}
                icon={<MoreHoriz />}
                options={[
                  {
                    name: t('button.edit')!,
                    handleClick: () => {
                      updateComment && updateComment(comment.comment);
                    }
                  },
                  {
                    name: t('button.delete')!,
                    handleClick: () => {
                      deleteComment && deleteComment();
                    }
                  }
                ]}
              />
            </Box>
          </ProtectBox>
        }
      </Paper>

      <Stack ml={2} alignItems={'center'} direction={'row'}>
        <Typography fontSize={13} color={'text.secondary'} mr={2}>
          {date_time && getTimeFromDay(date_time)}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mr: 0.5 }}>{loves} likes</Typography>
        {comment.children && comment.children?.length > 0 && (
          <Button
            sx={{ mr: 0, textTransform: 'capitalize', fontWeight: 600, fontSize: 13, color: 'text.secondary' }}
            onClick={() => {
              setCommentList &&
                setCommentList((prev: IComment[]) => {
                  const index = indexCmt || 0;

                  const newCmtList = [...prev];
                  newCmtList[index].collapsed = !comment.collapsed;
                  return newCmtList;
                });
            }}
          >
            {!comment.collapsed ? t('postDetail.viewReply')! : t('postDetail.hiddenReply')}
          </Button>
        )}
        <ProtectBox>
          <Button
            sx={{ mr: 0, textTransform: 'capitalize', fontWeight: 600, fontSize: 13, color: 'text.secondary' }}
            onClick={() => {
              setPayload && setPayload();
            }}
          >
            {t('postDetail.reply')}
          </Button>
        </ProtectBox>
        <IconButton
          onClick={() => {
            setIsLove(!isLove);
          }}
        >
          {isLove ? <Favorite sx={{ fontSize: 14 }} color='error' /> : <FavoriteBorder sx={{ fontSize: 14 }} />}
        </IconButton>
      </Stack>
    </Box>
  );
};
export default ItemComment;
