import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Tab from 'src/components/Tab';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import TabElement from './components/tabElement';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser } from 'src/types/user';
import { getUserThunk } from 'src/redux_store/user/user_action';
import { IPayloadGetUser } from 'src/types/auth';
import ProfileCover from './components/ProfileCover';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathName = location.pathname.substring(1);
  const { me } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser>();
  const [tabs, setTabs] = useState<any[]>([]);

  useEffect(() => {
    let id_user = pathName;
    if (pathName === 'profile') {
      id_user = me?.id_user;
    }
    const params: IPayloadGetUser = { id_user };
    if (me?.id_user) {
      params.id_me = me.id_user;
    }
    const action = getUserThunk(params);
    dispatch(action)
      .unwrap()
      .then((data: any) => {
        const { user } = data;
        if (user.id_user) {
          setUser(user);
        } else navigate('/notfound', { replace: true });
      })
      .catch(() => {
        navigate('/notfound', { replace: true });
      });
  }, [pathName]);

  useEffect(() => {
    if (user && user.id_user) {
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
  return (
    <Box mt={2} sx={{}} color={'common.black'}>
      {user && <ProfileCover user={user} />}
      {tabs.length > 0 && <Tab TabList={tabs} />}
    </Box>
  );
};

export default Profile;
