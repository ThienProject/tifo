import { Switch, Stack, Typography, Divider, SxProps, MenuList, MenuItem, Paper } from '@mui/material';
import { Box } from '@mui/system';

import React, { useState } from 'react';
import UserItem from 'src/components/items/UserItem';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import SearchBar from 'src/pages/components/SearchBar';
import RoomList from './RoomList';
import { IUserChat } from 'src/types/user';
import { searchRoomOrUserThunk } from 'src/redux_store/room/room_action';
import { useTranslation } from 'react-i18next';
import { updateInvisible } from 'src/redux_store/user/user_action';
import { setCurrentRoom } from 'src/redux_store/room/room_slice';
// import { setNewUserChat } from 'src/redux_store/room/room_slice';

const SidebarChat = ({ sx }: { sx?: SxProps }) => {
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [result, setResult] = useState<any[]>([]);
  const [note, setNote] = useState<string | null>('');

  return (
    <Box p={2} sx={sx} height='100%' borderRadius={2} border={'1px solid #e6dddd'}>
      <Box>
        <UserItem to={`/${me?.id_user}`} size='medium' user={me} isFullname />
        <Stack mt={0.3} ml={7} direction={'row'} alignItems={'center'}>
          <Switch
            onChange={(e) => {
              const action = updateInvisible({ id_user: me?.id_user, invisible: e.target.checked });
              dispatch(action);
            }}
            defaultChecked={!!me.invisible}
            size='small'
          />
          <Typography fontSize={12} color={'text.secondary'}>
            {t('message.invisible')}
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
            actionThunk={searchRoomOrUserThunk}
            setNote={setNote}
            setResult={setResult}
            param={{ id_user: me?.id_user }}
          />
          <Box>
            {result && result.length > 0 && (
              <Paper sx={{ p: 0, my: 1 }}>
                <MenuList sx={{ my: 0, py: 0, maxHeight: 300, overflow: 'auto' }}>
                  {result.map((item: IUserChat) => {
                    const to = item?.id_room ? `/message/${item.id_room}` : `/message/new/${item.id_user}`;
                    let chatObject: IUserChat = {};
                    if (item.id_user) {
                      chatObject = item;
                    } else {
                      chatObject.id_user = item.id_room;
                      chatObject.username = item.name;
                      chatObject.avatar = item.room_avatar;
                    }
                    return (
                      <MenuItem key={item.id_user} sx={{ my: 1, px: 0.5, mx: 0.5, borderRadius: 2 }}>
                        <UserItem
                          callback={() => {
                            if (!item?.id_room) {
                              const actionSetNewChat = setCurrentRoom({ type: 'new-chat', users: [{ ...item }] });
                              dispatch(actionSetNewChat);
                            }
                          }}
                          to={to}
                          size='small'
                          user={chatObject}
                        />
                      </MenuItem>
                    );
                  })}
                </MenuList>

                {note && <Typography sx={{ p: 1, m: 1, fontSize: 12 }}>{note}</Typography>}
              </Paper>
            )}
          </Box>
        </Box>
        <Divider />
        <Box>
          <RoomList />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarChat;
