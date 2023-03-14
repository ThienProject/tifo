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
  const [tabs, setTabs] = useState<any[]>([]);

  useEffect(() => {
    if (pathName === 'profile' || pathName === me.id_user) {
      setUser(me);
    } else if (pathName.startsWith('USER_')) {
      const action = getUserThunk({ id_user: pathName });
      dispatch(action)
        .unwrap()
        .then((data: any) => {
          const { user } = data;
          if (user.id_user) {
            setUser(user);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  useEffect(() => {
    if (user && user.id_user) {
      console.log('settablist');
      const tabList = [
        {
          tabName: 'posts',
          element: <TabElement.TabPost key={user.id_user} id_user={user.id_user} />
        },
        { tabName: 'reels', element: <TabElement.TabReel key={user.id_user} id_user={user.id_user} /> }
      ];
      if (pathName === 'profile' || pathName === me.id_user) {
        tabList.push({ tabName: 'saves', element: <TabElement.TabSave key={user.id_user} id_user={user.id_user} /> });
      }
      setTabs(tabList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  console.log('render', tabs);
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

      {tabs.length > 0 && <Tab TabList={tabs} />}
    </Box>
  );
};

export default Profile;
