import React, { useEffect, useState } from 'react';
import { Box, Stack, IconButton, TextField, Divider } from '@mui/material';
import { IComment, IPayloadCreateComment, IPayloadDeleteComment, IPayloadEditComment } from 'src/types/post';
import { useForm, Controller } from 'react-hook-form';
import { SendRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import {
  deleteCommentThunk,
  editCommentThunk,
  getCommentsThunk,
  sendCommentThunk
} from 'src/redux_store/post/post_action';
import ItemComment from './ItemComment';
import ProtectBox from 'src/components/ProtectBox';
import MODAL_IDS from 'src/constants/modal';

const defaultPayloadCmt = { id_parent: '0', id_reply: '0', id_comment: '' };
const Comment = (props: { socket: any; id_post: string /* comments: IComment[] */ }) => {
  const { id_post, socket } = props;
  const { control, handleSubmit, setValue, reset, setFocus } = useForm({
    defaultValues: { comment: '', action: 'send', id_commentEdit: '' }
  });
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [payload, setPayload] = useState(defaultPayloadCmt);
  const fetchComment = (id_post: string) => {
    const action = getCommentsThunk(id_post);
    dispatch(action)
      .unwrap()
      .then((data) => {
        const { comments } = data;
        setCommentList(comments);
      });
  };
  useEffect(() => {
    fetchComment(id_post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setListDelete = (deleteComment: IPayloadDeleteComment) => {
    const { id_parent, id_comment } = deleteComment;
    setCommentList((prev) => {
      const newList = prev.filter((item) => {
        if (!(id_parent == 0 && item.id_comment == id_comment)) {
          item.children = item?.children?.filter((child) => {
            if (id_comment != child.id_comment) {
              return child;
            }
          });
          return item;
        }
      });
      return newList;
    });
  };
  const setListSend = (newComment: IComment) => {
    const { id_parent } = newComment;
    setCommentList((prev: IComment[]) => {
      const newArr = [...prev];
      if (id_parent != 0) {
        const index = prev.findIndex((item) => item.id_comment == id_parent);
        newArr[index].collapsed = true;
        Array.isArray(newArr[index]?.children)
          ? newArr[index].children?.push(newComment)
          : (newArr[index].children = [newComment]);
      } else {
        newArr.push(newComment);
      }
      return newArr;
    });
  };
  const setListEdit = (editComment: IPayloadEditComment) => {
    const { id_parent, id_comment, comment } = editComment;
    setCommentList((prev: IComment[]) => {
      const newArr = [...prev];
      if (id_parent != 0) {
        const indexParent = prev.findIndex((item) => item.id_comment == id_parent);
        if (indexParent > -1) {
          const arrChild = newArr[indexParent].children || [];
          const indexChild = arrChild.findIndex((item) => item.id_comment == id_comment);
          if (indexChild > -1) {
            arrChild[indexChild].comment = comment;
          }
        }
      } else {
        const index = newArr.findIndex((item) => item.id_comment == editComment.id_comment);
        newArr[index].comment = editComment.comment;
      }
      return newArr;
    });
  };
  useEffect(() => {
    socket.on('new-comment', ({ newComment }: any) => {
      const { id_user } = newComment;
      if (me.id_user) {
        if (id_user !== me.id_user) {
          setListSend(newComment);
        }
      }
    });
    socket.on('edit-comment', ({ editComment }: any) => {
      const { id_user } = editComment;
      if (me.id_user) {
        if (id_user !== me.id_user) {
          setListEdit(editComment);
        }
      }
    });
    socket.on('delete-comment', ({ deleteComment }: any) => {
      const { id_user } = deleteComment;
      if (me.id_user) {
        if (id_user !== me.id_user) {
          setListDelete(deleteComment);
        }
      }
    });
    return () => {
      socket.off('new-comment');
      socket.off('edit-comment');
    };
  }, [setCommentList, socket, me.id_user]);
  const handleSubmitCmt = (data: { comment: string; action: string }) => {
    const { comment, action } = data;
    const id_user = me.id_user;
    const { id_parent, id_reply, id_comment } = payload;
    const newComment = comment.replace(/@\S+\s/, '');
    const newPayload = { id_user, id_parent, id_reply, comment: newComment, id_post, id_comment };
    if (newComment !== '' && id_user) {
      if (action === 'send') {
        sendCommentDispatch(newPayload);
      }
      if (action === 'edit') {
        editCommentDispatch(newPayload);
      }
    }
  };
  const sendCommentDispatch = (payload: IPayloadCreateComment) => {
    const action = sendCommentThunk(payload);
    dispatch(action)
      .unwrap()
      .then((data) => {
        setPayload(defaultPayloadCmt);
        reset();
        const { newComment } = data;
        setListSend(newComment);
      });
  };

  const deleteCommentDispatch = (id_comment: string | number, id_parent: string | number) => {
    const payload: IPayloadDeleteComment = { id_comment, id_parent };
    const action = deleteCommentThunk(payload);
    dispatch(action)
      .unwrap()
      .then(() => {
        setListDelete(payload);
      });
  };

  const editCommentDispatch = (payload: IPayloadEditComment) => {
    const action = editCommentThunk(payload);
    dispatch(action)
      .unwrap()
      .then(() => {
        setPayload(defaultPayloadCmt);
        reset();
        setListEdit(payload);
      });
  };

  return (
    <>
      <Box height={'85%'} sx={{ overflowY: 'scroll', maxWidth: '100%' }}>
        {commentList.map((comment, index) => {
          const id_cmt = comment.id_comment;
          return (
            <Box key={id_cmt}>
              {
                <Box>
                  <ItemComment
                    deleteComment={() => {
                      id_cmt && deleteCommentDispatch(id_cmt, 0);
                    }}
                    updateComment={(value?: string) => {
                      setPayload((prev) => {
                        const newPayload = {
                          ...prev,
                          id_parent: '0',
                          id_comment: id_cmt || ''
                        };

                        setValue('comment', `@${comment.username} ${value}`);

                        setValue('action', 'edit');
                        setFocus('comment');
                        return newPayload;
                      });
                    }}
                    setPayload={() => {
                      setPayload((prev) => {
                        const newPayload = {
                          ...prev,
                          id_parent: id_cmt || '',
                          id_reply: id_cmt || ''
                        };
                        setValue('comment', `@${comment.username} `);
                        setFocus('comment', { shouldSelect: true });
                        setFocus('comment');
                        return newPayload;
                      });
                    }}
                    indexCmt={index}
                    setCommentList={setCommentList}
                    comment={comment}
                  />

                  <Box ml={6}>
                    {comment.children?.map((commentChild) => {
                      if (commentChild.id_parent === comment.id_comment) {
                        const id_cmtChild = commentChild.id_comment;
                        if (comment.collapsed) {
                          return (
                            <ItemComment
                              deleteComment={() => {
                                id_cmtChild && id_cmt && deleteCommentDispatch(id_cmtChild, id_cmt);
                              }}
                              updateComment={(value?: string) => {
                                setPayload((prev) => {
                                  const newPayload = {
                                    ...prev,
                                    id_parent: id_cmt || '',
                                    id_comment: id_cmtChild || ''
                                  };
                                  setFocus('comment');
                                  setValue('comment', `@${comment.username} ${value}`);
                                  setValue('action', 'edit');

                                  return newPayload;
                                });
                              }}
                              setPayload={() => {
                                setPayload((prev) => {
                                  if (id_cmt && id_cmtChild) {
                                    const newPayload = {
                                      ...prev,
                                      id_parent: id_cmt,
                                      id_reply: id_cmtChild
                                    };
                                    setValue('comment', `@${commentChild.username} `);
                                    setFocus('comment', { shouldSelect: true });

                                    return newPayload;
                                  }
                                  return prev;
                                });
                              }}
                              replyName={commentChild?.reply?.username || ''}
                              key={id_cmtChild}
                              comment={commentChild}
                            />
                          );
                        }
                      }
                    })}
                  </Box>
                </Box>
              }
              <Divider sx={{ my: 1, mb: 3 }} />
            </Box>
          );
        })}
      </Box>
      <Stack maxHeight={'15%'} component='form' flexDirection={'row'}>
        <Controller
          name='comment'
          rules={{
            required: {
              value: true,
              message: 'Not empty!'
            }
          }}
          control={control}
          render={({ field: { ref, value, onChange } }) => {
            return (
              <TextField
                inputRef={ref}
                rows={2}
                fullWidth
                sx={{ with: '100%' }}
                value={value}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    setPayload(defaultPayloadCmt);
                    setValue('action', 'send');
                  }
                  onChange(value);
                }}
              />
            );
          }}
        />
        <ProtectBox toLogin idCloseModel={MODAL_IDS.postDetail}>
          <IconButton onClick={handleSubmit(handleSubmitCmt)} type='submit'>
            <SendRounded color='info' />
          </IconButton>
        </ProtectBox>
      </Stack>
    </>
  );
};

export default Comment;
