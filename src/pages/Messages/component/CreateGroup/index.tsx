import React, { useEffect, useState } from 'react';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import {
  Box,
  Typography,
  Popper,
  Stack,
  Fade,
  MenuList,
  MenuItem,
  Avatar,
  Paper,
  IconButton,
  Divider,
  Button,
  Input
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchBar from 'src/pages/components/SearchBar';
import { IUser } from 'src/types/user';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import { Close } from '@mui/icons-material';
import { CPath } from 'src/constants';
import { Controller, useForm } from 'react-hook-form';
const CreateGroup = ({ user }: { user: IUser }) => {
  const { t } = useTranslation();
  const [result, setResult] = useState<IUser[]>([]);
  const [note, setNote] = useState<string>('');
  const { control, handleSubmit, setValue, getValues } = useForm();
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
    console.log(data);
  };
  return (
    <ModalWrapper modalId={MODAL_IDS.createGroup}>
      <Box maxWidth={'34vw'} p={2}>
        <Box>
          <Controller
            name='name'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
              return (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography mr={2}>{t('message.create_group')} :</Typography>
                  <Input
                    placeholder={t('message.enter_group_name') || ''}
                    sx={{ fontSize: 13 }}
                    type='text'
                    value={value}
                    onChange={() => {
                      onChange(value);
                    }}
                  />
                </Stack>
              );
            }}
          />
          <Controller
            name='users'
            control={control}
            defaultValue={[user]}
            render={({ field: { value, onChange }, fieldState: { error, invalid } }) => {
              return (
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
              );
            }}
          />
          <Box>
            <Divider sx={{ mb: 1 }} />
            <SearchBar
              placeholder={t('message.add_member') || 'Add member'}
              actionThunk={getUsersThunk}
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
                        <Avatar src={CPath.host_public + user.avatar} sx={{ mr: 2 }} />
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
        <Button
          sx={{ margin: '5px auto', color: 'common.white', textTransform: 'capitalize' }}
          onClick={handleSubmit(handleOnSubmit)}
          variant='contained'
        >
          {t('button.group')}
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default CreateGroup;
