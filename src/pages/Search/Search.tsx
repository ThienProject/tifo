import { Box, Typography, Divider, MenuList, MenuItem, SxProps } from '@mui/material';
import React, { useState } from 'react';
import UserItem from 'src/components/items/UserItem';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar';
import { useAppSelector } from 'src/redux_store';
import Scrollbars from 'react-custom-scrollbars-2';

const Search = ({ handleClose, sx }: { handleClose: (event: Event | React.SyntheticEvent) => void; sx?: SxProps }) => {
  const { t } = useTranslation();
  const [result, setResult] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>('');
  const { me } = useAppSelector((state) => state.userSlice);
  return (
    <Box sx={{ p: 3, ...sx }}>
      <Typography variant='h6' mb={2}>
        {t('sidebar.search')}
      </Typography>
      <SearchBar param={{ id_user: me?.id_user }} actionThunk={getUsersThunk} setNote={setNote} setResult={setResult} />
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
            <Box sx={{ height: 'calc(100vh - 140px)' }}>
              <Scrollbars
                renderThumbVertical={({ style, ...props }) => {
                  const thumbStyle = {
                    backgroundColor: '#d8d3d333'
                  };
                  return <div style={{ ...style, ...thumbStyle }} {...props} />;
                }}
              >
                <MenuList>
                  {result.map((user) => (
                    <MenuItem onClick={handleClose} sx={{ p: 0, borderRadius: '5px' }} key={user.id_user}>
                      <UserItem
                        to={`/${user.id_user}`}
                        sx={{ padding: '10px 5px', width: '100%' }}
                        isFullname={true}
                        size='medium'
                        user={user}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </Scrollbars>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Search;
