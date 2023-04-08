import React, { useEffect, useState } from 'react';
import Messages from './Messages';
import { useAppDispatch, useAppSelector } from 'src/redux_store';
import { getGroupsThunk } from 'src/redux_store/message/message_action';
import { IGroup } from 'src/types/group';

const MessageWrapper = () => {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.userSlice);
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    const id_user = me.id_user;
    if (id_user) {
      const action = getGroupsThunk({ id_user, offset: 0, limit: 10 });
      dispatch(action)
        .unwrap()
        .then((data) => {
          setGroups(data.groups);
          console.log('data', data);
        });
    }
  }, []);
  return <> {groups.length > 0 && <Messages setGroups={setGroups} groups={groups} />}</>;
};

export default MessageWrapper;
