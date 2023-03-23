import React from 'react';
import { Box, Paper } from '@mui/material';
import { ImenuItem } from 'src/types/common';
import Search from 'src/pages/Search';

const SubSidebar = ({
  handleClose,
  item
}: {
  item: ImenuItem;
  handleClose: (event: Event | React.SyntheticEvent) => void;
}) => {
  const CPN = item.childNode;
  return (
    <Paper>
      <Box sx={{ width: '500px', height: '100vh' }}>{<CPN handleClose={handleClose} />}</Box>
    </Paper>
  );
};

export default SubSidebar;
