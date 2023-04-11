import { Switch, Stack, Typography, Divider, SxProps } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState } from 'react';
import UserItem from 'src/components/items/UserItem';
import { useAppSelector } from 'src/redux_store';
import SearchBar from 'src/pages/components/SearchBar';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import GroupList from './GroupList';
import ItemFriend from 'src/pages/Home/components/ListFriends/ItemFriend';

const SidebarChat = ({ sx }: { sx?: SxProps }) => {
  const { me } = useAppSelector((state) => state.userSlice);
  const [result, setResult] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>('');

  return (
    <Box p={2} sx={sx} height='100%' borderRadius={2} border={'1px solid #e6dddd'}>
      <Box>
        <UserItem size='media' user={me} isFullname />
        <Stack mt={0.3} ml={7} direction={'row'} alignItems={'center'}>
          <Switch size='small' />
          <Typography fontSize={12} color={'text.secondary'}>
            Invisible
          </Typography>
        </Stack>
        <Box my={2}>
          <SearchBar
            sx={{
              py: 0.5,
              backgroundColor: 'common.white',
              border: '1px solid #dcd9d9',
              ':hover': { border: '1px solid #999' },
              ':focus-within': { border: '1.4px solid var(--mui-palette-primary-main)' }
            }}
            actionThunk={getUsersThunk}
            setNote={setNote}
            setResult={setResult}
          />
          <Box>
            {result &&
              result.length > 0 &&
              result.map((item: any) => <ItemFriend key={item.id_user} itemFriend={item} />)}
          </Box>

          <Typography>{note && note}</Typography>
        </Box>
        <Divider />
        <Box>
          <GroupList />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarChat;
