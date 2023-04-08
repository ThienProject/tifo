import { Box, Stack, Avatar, Divider, styled, Drawer, IconButton, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { IChatDates, IGroup } from 'src/types/group';
import { IUser } from 'src/types/user';
import ChatContent from './ChatContent';
import { Scrollbars } from 'react-custom-scrollbars-2';
import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getChatsByIDGroupThunk } from 'src/redux_store/message/message_action';

const ChatBox = ({ group, ButtonToggle }: { group: IGroup; ButtonToggle: React.ReactNode }) => {
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const [chats, setChats] = useState<IChatDates[]>();
  const me_id = me.id_user;
  const isChatFriend = group?.users?.length === 2;
  let avatar = group?.avatar ? CPath.host_public + group.avatar : images.account;
  let chatName = group?.name;
  let friend: IUser = {};
  if (isChatFriend && group.users) {
    friend = group.users.find((us) => us.id_user != me_id) || {};
    if (friend.avatar) {
      avatar = CPath.host_public + group?.users[1].avatar;
    }
    chatName = friend.fullname;
  }
  useEffect(() => {
    if (group && group.id_group) {
      const action = getChatsByIDGroupThunk({ id_group: group.id_group, offset: 0, limit: 10 });
      dispatch(action)
        .unwrap()
        .then((data) => {
          setChats(data.chats);
        });
    }
  }, []);
  const ChatTopBar = styled(Box)(
    ({ theme }) => `
        background: ${theme.palette.common.white};
        border-bottom: ${theme.palette.grey[300]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
  );
  const ChatWindow = styled(Box)(
    () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
  );

  console.log('user', friend);
  return (
    <ChatWindow>
      <ChatTopBar
        sx={{
          display: { xs: 'flex', lg: 'inline-block' }
        }}
      >
        {ButtonToggle}
        <TopBarContent user={friend} />
      </ChatTopBar>
      <Box bgcolor={'rgb(242, 245, 249)'} flex={1}>
        <Scrollbars>{chats && <ChatContent chatDates={chats} />}</Scrollbars>
      </Box>
      <Divider />
      <BottomBarContent />
    </ChatWindow>
  );
};

export default ChatBox;
