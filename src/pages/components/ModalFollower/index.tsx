import { Button, Divider, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import ProtectBox from 'src/components/ProtectBox/ProtectBox';
import UserItem from 'src/components/items/UserItem';
import ModalWrapper from 'src/components/model/ModelWrapper';
import ConfirmationDialog from 'src/components/model/confirmation_dialog';
import MODAL_IDS from 'src/constants/modal';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { closeModal, openModal } from 'src/redux_store/common/modal/modal_slice';
import { rejectFollowThunk, unfollowThunk } from 'src/redux_store/user/user_action';
import { IUser } from 'src/types/user';

const ModalFollower = ({
  users: currentUsers,
  title,
  id_owner
}: {
  users: IUser[];
  title: string;
  id_owner: string;
}) => {
  const { t } = useTranslation();
  const { me } = useAppSelector((state) => state.userSlice);
  const [users, setUsers] = useState(currentUsers);
  const dispatch = useAppDispatch();
  const handleRemoveFollow = (id_follower: string) => {
    if (me?.id_user) {
      dispatch(
        openModal({
          modalId: MODAL_IDS.confirmRemove,
          dialogComponent: (
            <ConfirmationDialog
              describe={t('confirm.unfollow')}
              sliceName={'post'}
              functionName={'unfollowThunk'}
              modalId={MODAL_IDS.confirmRemove}
              callback={() => {
                const action = rejectFollowThunk({ id_follower, id_user: me?.id_user });
                dispatch(action)
                  .unwrap()
                  .then((data) => {
                    setUsers((prev) => {
                      return prev.filter((item) => item.id_user !== id_follower);
                    });
                    console.log(data);
                  });
                dispatch(
                  closeModal({
                    modalId: MODAL_IDS.confirmRemove
                  })
                );
              }}
            />
          )
        })
      );
    }
  };
  const handleUnfollow = (id_user: string) => {
    if (me?.id_user) {
      dispatch(
        openModal({
          modalId: MODAL_IDS.confirmUnfollow,
          dialogComponent: (
            <ConfirmationDialog
              describe={t('confirm.remove')}
              sliceName={'post'}
              functionName={'unfollowThunk'}
              modalId={MODAL_IDS.confirmUnfollow}
              callback={() => {
                const action = unfollowThunk({ id_follower: me?.id_user, id_user });
                dispatch(action)
                  .unwrap()
                  .then((data) => {
                    setUsers((prev) => {
                      return prev.filter((item) => item.id_user !== id_user);
                    });
                    console.log(data);
                  });
                dispatch(
                  closeModal({
                    modalId: MODAL_IDS.confirmUnfollow
                  })
                );
              }}
            />
          )
        })
      );
    }
  };
  return (
    <ModalWrapper modalId={MODAL_IDS.followers}>
      <Stack textAlign={'center'}>
        <Typography my={1} textTransform={'capitalize'} fontWeight={600}>
          {title}
        </Typography>
        <Divider />
        <Scrollbars autoHeight={true} autoHeightMin={200} autoHeightMax={400}>
          <MenuList>
            {users.map((user) => (
              <MenuItem key={user.id_user} sx={{ mt: 1 }}>
                <UserItem
                  to={'/' + user.id_user}
                  callback={() => {
                    dispatch(
                      closeModal({
                        modalId: MODAL_IDS.followers
                      })
                    );
                  }}
                  size='medium'
                  isFullname
                  user={user}
                />
                {
                  <ProtectBox id_owner={id_owner}>
                    <>
                      {title === 'followers' ? (
                        <Button
                          size='small'
                          sx={{ flex: 'flex-end', fontSize: 12, color: 'white', textTransform: 'capitalize' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFollow(user.id_user!);
                            // handleAcceptFollow(noti);
                          }}
                          variant='contained'
                        >
                          {t('button.remove')}
                        </Button>
                      ) : (
                        <Button
                          size='small'
                          sx={{ flex: 'flex-end', fontSize: 12, color: 'white', textTransform: 'capitalize' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnfollow(user.id_user!);
                            // handleAcceptFollow(noti);
                          }}
                          variant='contained'
                        >
                          {t('button.unfollow')}
                        </Button>
                      )}
                    </>
                  </ProtectBox>
                }
              </MenuItem>
            ))}
          </MenuList>
        </Scrollbars>
      </Stack>
    </ModalWrapper>
  );
};

export default ModalFollower;
