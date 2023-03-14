import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'src/redux_store';

const ProtectBox = ({ children, id_owner }: { children: React.ReactNode; id_owner?: string }) => {
  const { me } = useAppSelector((state) => state.userSlice);
  if (id_owner) return <>{me.id_user === id_owner && children}</>;
  else {
    return <>{me.id_user && children}</>;
  }
};

export default ProtectBox;
