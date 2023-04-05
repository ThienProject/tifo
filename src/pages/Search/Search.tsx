import { Box, Input, Typography, Divider, MenuList, MenuItem } from '@mui/material';
import { SearchRounded, Cancel, RotateRightRounded } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import useDebounced from '../../hooks/useDebounced';
import UserItem from 'src/components/items/UserItem';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import { useAppDispatch } from 'src/redux_store';
import { IUser } from 'src/types/user';
import { useTranslation } from 'react-i18next';

const Search = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounced = useDebounced(value);
  const [result, setResult] = useState<IUser[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>('');
  const fetchApi = (debounced: string) => {
    setPending(true);
    const action = getUsersThunk({ q: debounced });
    dispatch(action)
      .unwrap()
      .then((data: any) => {
        setPending(false);
        const { users } = data;
        if (users) {
          setResult(users);
        }
        if (users.length == 0) {
          setNote(t('search.noAccount'));
        }
      });
  };
  useEffect(() => {
    if (debounced) fetchApi(debounced);
  }, [debounced]);

  useEffect(() => {
    setNote('');
    if (value.trim() === '') {
      setResult([]);
    }
  }, [value]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6' mb={2}>
        {t('sidebar.search')}
      </Typography>
      <Box
        borderRadius={2}
        p={1}
        bgcolor='#efefef'
        display={'flex'}
        alignItems='center'
        justifyContent={'space-between'}
      >
        <SearchRounded sx={{ color: '#c5c5c5', marginRight: 1 }} fontSize='small' />
        <Input
          value={value}
          fullWidth
          disableUnderline
          placeholder='search'
          onChange={(e) => {
            const val = e.target.value;
            setValue(val.trim());
          }}
        />
        <IconButton
          onClick={() => {
            setValue('');
          }}
        >
          {value !== '' &&
            (!pending ? (
              <Cancel sx={{ color: '#c5c5c5' }} fontSize='small' />
            ) : (
              <RotateRightRounded
                fontSize='small'
                sx={{
                  '@keyframes rotate': {
                    from: { transform: 'rotate(0)' },
                    to: { transform: 'rotate(360deg)' }
                  },
                  transformOrigin: 'center',
                  // transform: 'rotate(360deg)',
                  animation: 'rotate .4s linear infinite'
                }}
              />
            ))}
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        {value === '' ? (
          <Box>
            <Typography fontSize={14} mb={2}>
              {t('search.recent')}
            </Typography>
          </Box>
        ) : (
          <>
            {note && <Typography>{note}</Typography>}
            <MenuList>
              {result.map((user) => (
                <MenuItem onClick={handleClose} sx={{ p: 0, borderRadius: '5px' }} key={user.id_user}>
                  <UserItem sx={{ padding: '10px 5px', width: '100%' }} isFullname={true} size='media' user={user} />
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Search;
