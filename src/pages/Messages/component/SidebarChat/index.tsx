import { Switch, Stack, Typography, MenuList, MenuItem, Divider, SxProps } from '@mui/material';
import { Box } from '@mui/system';
import { SearchRounded, Cancel, RotateRightRounded } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from 'react';
import UserItem from 'src/components/items/UserItem';
import TabCNP from 'src/components/Tab/Tab';
import { useAppSelector } from 'src/redux_store';
import SearchBar from 'src/pages/components/SearchBar';
import { getUsersThunk } from 'src/redux_store/user/user_action';
import ChatList from './ChatList';
import { IGroup } from 'src/types/group';

const SidebarChat = ({ sx }: { sx?: SxProps }) => {
  const fakeGroups: IGroup[] = [
    {
      id_group: ' 1',
      users: [
        {
          id_user: '1',
          fullname: 'Thiên',
          username: 'Thiên'
        },
        {
          id_user: '2',
          fullname: 'Năm',
          username: 'Năm'
        }
      ],
      chats: [
        {
          id_chat: '1',
          id_user: '1',
          message: 'Hey there, how are you today? Is it ok if I call you?'
        },
        {
          id_chat: '2',
          id_user: '2',
          message: 'Hi! Did you manage to send me those documents'
        }
      ]
    },
    {
      id_group: ' 2',
      users: [
        {
          id_user: '1',
          fullname: 'Thiên',
          username: 'Thiên'
        },
        {
          id_user: '2',
          fullname: 'Thiên',
          username: 'Vỹ'
        }
      ],
      chats: [
        {
          id_chat: '1',
          id_user: '2',
          message: 'Hi! Did you manage to send me those documents'
        },
        {
          id_chat: '2',
          id_user: '1',
          message: 'Hey there, how are you today? Is it ok if I call you?'
        }
      ]
    }
  ];
  const { me } = useAppSelector((state) => state.userSlice);
  const [result, setResult] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>('');
  const [groups, setGroups] = useState<IGroup[]>([]);
  const handleLoadMore = () => {
    setGroups(fakeGroups);
  };
  useEffect(() => {
    handleLoadMore();
  }, []);
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
        </Box>
        <Divider />
        <Box>
          <ChatList groups={groups} handleLoadMore={handleLoadMore} />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarChat;
