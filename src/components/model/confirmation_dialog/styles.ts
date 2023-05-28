import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  paper: { overflow: 'initial !important' },
  dialog: {
    position: 'relative',
    paddingTop: 20,
    minWidth: 340,
    maxWidth: 475,
    marginTop: 2
  },
  icon: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 0,
    boxShadow: '1px 2px 13px #00000040',
    zIndex: 9
  },
  dialogTitle: {
    '& h2': {
      marginTop: '30px',
      fontSize: 20
    }
  },
  actionButton: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    '& button:first-child': {
      marginRight: 10
    }
  },
  wrapperButton: {
    position: 'relative'
  }
}));
