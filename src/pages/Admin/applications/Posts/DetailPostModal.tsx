import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TabCNP from 'src/components/Tab/Tab';
import ModalWrapper from 'src/components/model/ModelWrapper';
import MODAL_IDS from 'src/constants/modal';
import { IPostAdmin } from 'src/types/post';
import Overview from './components/tabElement/TabOverview';
import Scrollbars from 'react-custom-scrollbars-2';

const DetailUserModal = ({ post }: { post: IPostAdmin }) => {
  const [tabs, setTabs] = useState<any[]>([]);
  useEffect(() => {
    if (post && post.id_post) {
      const tabList = [
        {
          tabName: 'Overview',
          element: <Overview id_post={post.id_post} />
        }
      ];
      setTabs(tabList);
    }
  }, [post]);
  return (
    <ModalWrapper isFullHeight maxWidth={800} minWidth={800} modalId={MODAL_IDS.viewDetailPostAdmin}>
      <Box padding={1} sx={{ overflowY: 'scroll', maxHeight: '100%' }}>
        <Box ml={0.5}>
          {/* <UserItem size='small' isFullname post={post} /> */}
          {/* <Typography>{post.postname}</Typography> */}
        </Box>
        <TabCNP TabList={tabs}></TabCNP>
      </Box>
    </ModalWrapper>
  );
};

export default DetailUserModal;
