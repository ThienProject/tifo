import { createTheme, PaletteOptions } from '@mui/material';

const paletteDark: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },
  // error: {
  //   main: '#d63031'
  // },
  secondary: {
    main: '#ff3040'
  },
  common: {
    black: '#ffffff',
    white: '#262626'
  }
};
const paletteLight: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },
  // error: {
  //   main: '#d63031'
  // },
  secondary: {
    main: '#ff3040'
  },
  common: {
    black: '#262626',
    white: '#ffffff'
  }
};

const theme = createTheme({
  palette: paletteLight || paletteDark,
  typography: {}
});

export default theme;
