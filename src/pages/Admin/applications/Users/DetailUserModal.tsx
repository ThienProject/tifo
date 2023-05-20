import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TabCNP from 'src/components/Tab/Tab';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { IUserAdmin } from 'src/types/user';
import Overview from './components/tabElement/TabOverview';
import UserItem from 'src/components/items/UserItem';
import { t } from 'i18next';

const DetailUserModal = ({ user }: { user: IUserAdmin }) => {
  const [tabs, setTabs] = useState<any[]>([]);
  useEffect(() => {
    if (user && user.id_user) {
      const tabList = [
        {
          tabName: t('admin.overview'),
          element: <Overview id_user={user.id_user} />
        }
      ];
      setTabs(tabList);
    }
  }, [user]);
  return (
    <ModalWrapper modalId={MODAL_IDS.viewDetailUser}>
      <Box padding={1}>
        <Box ml={0.5}>
          <UserItem size='small' isFullname user={user} />
          {/* <Typography>{user.username}</Typography> */}
        </Box>
        <TabCNP TabList={tabs}></TabCNP>
      </Box>
    </ModalWrapper>
  );
};

export default DetailUserModal;
