import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Tab from 'src/components/Tab';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import TabElement from './components/tabElement';
import TopProfile from './components/TopProfile';
import { useLocation } from 'react-router-dom';
import { IUser } from 'src/types/user';
import { getUserThunk } from 'src/redux_store/user/user_action';

const Profile = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1);
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser>();
  const [tabList, setTabList] = useState<any[]>([]);

  useEffect(() => {
    let userID = '';
    if (pathName.startsWith('USER_')) {
      const action = getUserThunk({ id_user: pathName });
      dispatch(action)
        .unwrap()
        .then((data: any) => {
          const { user } = data;
          if (user.id_user) {
            userID = user.id_user;
            setUser(user);
          }
        });
    } else if (pathName === 'profile') {
      setUser(me);
    }
  }, []);
  useEffect(() => {
    if (user) {
      const tabList = [
        {
          tabName: 'posts',
          element: <TabElement.TabPost id_user={user.id_user!} />
        },
        { tabName: 'reels', element: <TabElement.TabReel id_user={user.id_user!} /> }
      ];
      if (pathName === 'profile') {
        tabList.push({ tabName: 'saves', element: <TabElement.TabSave id_user={user.id_user!} /> });
      }

      setTabList(tabList);
    }
  }, [user]);

  return (
    <Box
      mt={2}
      sx={{
        ml: {
          lg: 10
        }
      }}
      color={'common.black'}
    >
      {user ? <TopProfile user={user} /> : "Can't find this Page"}

      {tabList.length > 0 && <Tab TabList={tabList} />}
    </Box>
  );
};

export default Profile;
