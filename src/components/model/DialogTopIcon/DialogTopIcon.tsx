import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

import { useStyles } from './styles';

interface IDialogTopIconProps {
  icon: ReactNode;
}

function DialogTopIcon(props: IDialogTopIconProps) {
  const classes = useStyles();
  return <Box className={classes.icon}>{props.icon}</Box>;
}

export default DialogTopIcon;
