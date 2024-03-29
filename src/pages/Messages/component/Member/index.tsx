import React, { useEffect } from 'react';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { Box, Typography, Stack, MenuList, MenuItem, Button, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IUser } from 'src/types/user';
import { MoreHoriz, DeleteOutline } from '@mui/icons-material';
import { CPath } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import { toastMessage } from 'src/utils/toast';
import MenuOption from 'src/components/MenuOption';
import { useNavigate } from 'react-router';
import AddMember from './AddMember';
import { deleteRoomThunk, deleteUserThunk, getUsersByIDRoomThunk } from 'src/redux_store/room/room_action';
import Scrollbars from 'react-custom-scrollbars-2';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';

const Member = ({ id_room }: { id_room: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const { rooms } = useAppSelector((state) => state.roomSlice);
  const room = rooms.find((item) => item.id_room === id_room);
  const users = room?.users;
  useEffect(() => {
    const action = getUsersByIDRoomThunk({ id_room });
    dispatch(action).unwrap();
  }, []);
  const isLeader = users && users.some((item) => item.id_user === me?.id_user && item.role === 1);
  return (
    <ModalWrapper modalId={MODAL_IDS.memberManager}>
      <Box maxWidth={'34vw'} p={2}>
        {isLeader ? (
          <Stack flexDirection={'row'} justifyContent={'center'}>
            <Button
              onClick={() => {
                const action = openModal({
                  modalId: MODAL_IDS.addMember,
                  dialogComponent: <AddMember id_room={id_room} />
                });
                dispatch(action);
              }}
              sx={{ textTransform: 'capitalize' }}
              variant='outlined'
            >
              {t('message.add_member')}
            </Button>
          </Stack>
        ) : (
          <Typography>{t('message.memberTitle')}</Typography>
        )}
        <Scrollbars autoHide={false} autoHeight={true} autoHeightMin={300} autoHeightMax={400}>
          <MenuList>
            {users?.map((user: IUser) => {
              return (
                <MenuItem
                  sx={{
                    borderRadius: 1,
                    p: 0,
                    mr: 1,
                    mt: 1,
                    '& .menu-option__member': {
                      display: 'none'
                    },
                    '&:hover .menu-option__member ': {
                      display: 'block'
                    }
                  }}
                  key={user.id_user}
                >
                  <Stack
                    onClick={() => {
                      dispatch(closeModal({ modalId: MODAL_IDS.memberManager }));
                      navigate('/' + user.id_user);
                    }}
                    p={1}
                    direction={'row'}
                    alignItems={'center'}
                  >
                    <Avatar sx={{ mr: 1 }} alt={user.username} src={CPath.host_user + user.avatar} />
                    <Box>
                      <Typography>{user.fullname}</Typography>
                      {user.role === 1 && <Typography fontSize={12}>{t('message.leader')}</Typography>}
                    </Box>
                  </Stack>
                  {isLeader && user.id_user !== me?.id_user && (
                    <MenuOption
                      classIcon='menu-option__member'
                      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
                      icon={<MoreHoriz />}
                      options={[
                        {
                          element: (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                const id_user = me?.id_user;
                                const action =
                                  users.length > 3
                                    ? openModal({
                                        modalId: MODAL_IDS.confirmDeleteUser,
                                        dialogComponent: (
                                          <ConfirmationDialog
                                            describe={t('confirm.deleteUser')}
                                            sliceName={'rooms'}
                                            functionName={'deleteUserThunk'}
                                            modalId={MODAL_IDS.confirmDeleteUser}
                                            callback={() => {
                                              if (id_room) {
                                                const action = deleteUserThunk({
                                                  id_owner: id_user,
                                                  id_user: user.id_user!,
                                                  id_room
                                                });
                                                dispatch(action)
                                                  .unwrap()
                                                  .then(() => {
                                                    toastMessage.success(t('toast.deleteSuccess', { object: 'user' }));
                                                    dispatch(closeModal({ modalId: MODAL_IDS.confirmDeleteUser }));
                                                  });
                                              }
                                            }}
                                          />
                                        )
                                      })
                                    : openModal({
                                        modalId: MODAL_IDS.confirmDeleteRoom,
                                        dialogComponent: (
                                          <ConfirmationDialog
                                            describe={t('confirm.deleteRoom')}
                                            sliceName={'rooms'}
                                            functionName={'deleteRoomThunk'}
                                            modalId={MODAL_IDS.confirmDeleteRoom}
                                            callback={() => {
                                              if (id_room) {
                                                const action = deleteRoomThunk({ id_room });
                                                dispatch(action)
                                                  .unwrap()
                                                  .then(() => {
                                                    toastMessage.success(t('toast.deleteSuccess', { object: 'room' }));
                                                    dispatch(closeModal({ modalId: MODAL_IDS.confirmDeleteRoom }));
                                                    navigate('/message');
                                                  });
                                              }
                                            }}
                                          />
                                        )
                                      });
                                if (id_user) {
                                  dispatch(action);
                                }
                              }}
                              key={2}
                              startIcon={<DeleteOutline fontSize='small' />}
                              sx={{ p: 0, justifyContent: 'flex-start' }}
                              color='error'
                              variant='text'
                              fullWidth
                            >
                              <Typography
                                textTransform={'capitalize'}
                                fontSize={13}
                                fontWeight={100}
                                color='text.secondary'
                              >
                                {t('button.delete')}
                              </Typography>
                            </Button>
                          )
                        }
                      ]}
                    />
                  )}
                </MenuItem>
              );
            })}
          </MenuList>
        </Scrollbars>
      </Box>
    </ModalWrapper>
  );
};

export default Member;
