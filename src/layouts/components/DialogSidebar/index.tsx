import { Box, ClickAwayListener, Paper, useTheme } from '@mui/material';
import React from 'react';

type IProp = {
  handleClose: () => void;
  children: React.ReactNode;
};
const DialogSidebar = (props: IProp) => {
  const { handleClose, children } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        width: '450px',
        '@keyframes example': {
          from: { zIndex: -1, transform: 'translateX(-9999px)', opacity: 0 },
          to: { zIndex: -1, transform: 'translateX(0)', opacity: 1 }
        },
        animationName: 'example',
        animationDuration: '0.5s',
        transform: 'translateX(0)'
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Paper sx={{ height: '100%', borderRadius: 3, boxShadow: `2px 0.5px 2px ${theme.palette.grey[200]}` }}>
          {children}
        </Paper>
      </ClickAwayListener>
    </Box>
  );
};

export default DialogSidebar;
