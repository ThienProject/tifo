import React, { useState } from 'react';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import {
  Box,
  Typography,
  Stack,
  MenuList,
  MenuItem,
  Avatar,
  Paper,
  IconButton,
  Divider,
  FormHelperText
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IUser } from 'src/types/user';
import { Close } from '@mui/icons-material';
import { CPath } from 'src/constants';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { addMembersThunk } from 'src/redux_store/room/room_action';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import { toastMessage } from 'src/utils/toast';
import SearchBar from 'src/pages/components/SearchBar';
import { getUsersNotInRoomThunk } from 'src/redux_store/user/user_action';
import { LoadingButton } from '@mui/lab';
import { useIsRequestPending } from 'src/hooks/use_status';
const AddMember = ({ id_room }: { id_room: string }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const [result, setResult] = useState<IUser[]>([]);
  const [note, setNote] = useState<string>('');
  const { control, handleSubmit, setValue, getValues, setError } = useForm();
  const isLoading = useIsRequestPending('rooms', 'addMembersThunk');
  const setNewResult = (arr: any[]) => {
    const newArr = arr.filter((item: any) => {
      const index = getValues('users').findIndex((user: IUser) => item.id_user === user.id_user);
      if (index > -1) {
        return false;
      } else {
        return true;
      }
    });
    setResult(newArr);
  };
  const handleOnSubmit = (data: any) => {
    const { users } = data;
    const id_me = me?.id_user;
    if (users.length < 1) {
      setError('users', { message: t('createRoom.rulerUser') || '' });
      return;
    }
    if (id_me) {
      const newUsers = users.map((user: IUser) => ({
        id_user: user.id_user
      }));
      const payload = { id_user: id_me, users: newUsers, id_room };
      const action = addMembersThunk(payload);
      dispatch(action)
        .unwrap()
        .then(() => {
          dispatch(closeModal({ modalId: MODAL_IDS.addMember }));
        })
        .catch((e) => {
          toastMessage.setErrors(e);
        });
    }
  };
  return (
    <ModalWrapper modalId={MODAL_IDS.addMember}>
      <Box component={'form'} onSubmit={handleSubmit(handleOnSubmit)} minHeight={450} width={'34vw'} p={2}>
        <Box>
          <Typography>{t('message.add_member')}</Typography>
          <Divider sx={{ my: 1 }} />
          <Controller
            name='users'
            control={control}
            defaultValue={[]}
            rules={{ required: { value: true, message: '' } }}
            render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
              return (
                <Box>
                  <MenuList sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {value.map((user: IUser) => {
                      return (
                        <MenuItem
                          sx={{ p: 0, mr: 1, mt: 1 }}
                          key={user.id_user}
                          onClick={() => {
                            const newList = value.filter((u: IUser) => u.id_user !== user.id_user);
                            onChange(newList);
                            setResult((prev) => {
                              return [...prev, user];
                            });
                          }}
                        >
                          <Paper variant='outlined'>
                            <Stack py={0} pl={1} direction={'row'} alignItems={'center'}>
                              <Typography fontSize={14}>{user.username}</Typography>
                              <IconButton>
                                <Close fontSize='small' />
                              </IconButton>
                            </Stack>
                          </Paper>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                  {invalid && error && (
                    <FormHelperText error={invalid} id='my-helper-text'>
                      {error.message}
                    </FormHelperText>
                  )}
                </Box>
              );
            }}
          />
          <Box>
            <Box my={1}>
              <SearchBar
                param={{ id_user: me?.id_me, id_room: id_room }}
                placeholder={t('message.add_member') || 'Add member'}
                actionThunk={getUsersNotInRoomThunk}
                setNote={setNote}
                setResult={setNewResult}
                sx={{ py: 0.5 }}
              />
              <Paper sx={{ p: 0, my: 1 }}>
                {note === '' ? (
                  <MenuList sx={{ py: 0, maxHeight: 300, overflow: 'auto' }}>
                    {result.map((user) => {
                      return (
                        <MenuItem
                          key={user.id_user}
                          onClick={() => {
                            setResult((prev) => {
                              const newList = prev.filter((u) => u.id_user !== user.id_user);
                              return newList;
                            });
                            setValue('users', [...getValues('users'), user]);
                          }}
                        >
                          <Avatar src={CPath.host_user + user.avatar} sx={{ mr: 2 }} />
                          <Typography fontSize={14}>{user.fullname}</Typography>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                ) : (
                  <Typography fontSize={14}>{note}</Typography>
                )}
              </Paper>
            </Box>
          </Box>
        </Box>
        <LoadingButton
          loading={isLoading}
          sx={{ margin: '5px auto', color: 'common.white', textTransform: 'capitalize' }}
          type='submit'
          variant='contained'
        >
          {t('message.add_member')}
        </LoadingButton>
      </Box>
    </ModalWrapper>
  );
};

export default AddMember;
