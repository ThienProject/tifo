import { Box, Divider, styled } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import images from 'src/assets/images';
import { CPath } from 'src/constants';
import { IUser } from 'src/types/user';
import ChatContent from './ChatContent';
import { Scrollbars } from 'react-custom-scrollbars-2';
import BottomBarContent from './BottomBarContent';
import TopBarContent from './TopBarContent';

import { useAppSelector } from 'src/redux_store';
import { useParams } from 'react-router';

const ChatBox = ({ ButtonToggle }: { ButtonToggle: React.ReactNode }) => {
  const groups = useAppSelector((state) => state.groupSlice.groups);
  const scrollbarsRef = useRef<any>();
  const { id_group } = useParams();
  const group = groups.find((item: any) => item.id_group === id_group);
  const chats = useAppSelector((state) => {
    if (id_group) return state.groupSlice.chats[id_group];
  });
  const { me } = useAppSelector((state) => state.userSlice);

  const isChatFriend = group?.users?.length === 2;
  let avatar = group?.avatar ? CPath.host_public + group.avatar : images.account;
  let chatName = group?.name;
  let friend: IUser = {};
  if (isChatFriend && group.users) {
    const me_id = me.id_user;
    friend = group.users.find((us) => us.id_user != me_id) || {};
    if (friend.avatar) {
      avatar = CPath.host_public + group?.users[1].avatar;
    }
    chatName = friend.fullname;
  }
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
  useEffect(() => {
    scrollbarsRef.current?.scrollToBottom();
  }, []);
  return (
    <>
      {group && (
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
            <Scrollbars ref={scrollbarsRef}>{chats && <ChatContent chatDates={chats} />}</Scrollbars>
          </Box>
          <Divider />
          <BottomBarContent id_group={group.id_group} />
        </ChatWindow>
      )}
    </>
  );
};

export default ChatBox;
