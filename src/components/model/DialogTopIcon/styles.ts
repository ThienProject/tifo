import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles<Theme>((theme) => ({
  paper: { overflow: 'initial !important' },
  icon: {
    position: 'absolute',
    width: 65,
    height: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: -30,
    boxShadow: `-1px -8px 4px ${theme.palette.secondary.dark}`,
    zIndex: 9,
    background: theme.palette.primary.contrastText
  }
}));
