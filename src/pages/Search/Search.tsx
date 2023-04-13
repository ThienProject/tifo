import { Box, Typography, Divider, MenuList, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import UserItem from 'src/components/items/UserItem';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar';

const Search = ({ handleClose }: { handleClose: (event: Event | React.SyntheticEvent) => void }) => {
  const { t } = useTranslation();
  const [result, setResult] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>('');
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h6' mb={2}>
        {t('sidebar.search')}
      </Typography>
      <SearchBar actionThunk={getUsersThunk} setNote={setNote} setResult={setResult} />
      <Divider sx={{ my: 2 }} />
      <Box>
        {note === '' && result.length <= 0 ? (
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
                  <UserItem
                    to={`/${user.id_user}`}
                    sx={{ padding: '10px 5px', width: '100%' }}
                    isFullname={true}
                    size='media'
                    user={user}
                  />
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
