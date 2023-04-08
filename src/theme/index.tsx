import { PaletteOptions } from '@mui/material';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
const paletteDark: PaletteOptions = {
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },
  error: {
    main: '#d63031'
  },
  secondary: {
    main: '#ff3040'
  },
  common: {
    black: '#ffffff',
    white: '#262626'
  },

  text: {
    primary: '#7c7d7c'
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  success: {
    main: '#4caf50',
    light: '#94dc97'
  }
};
const paletteLight: PaletteOptions = {
  background: {
    default: '#fff'
  },
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },
  error: {
    main: '#d63031'
  },
  secondary: {
    main: '#ff3040'
  },
  common: {
    black: '#262626',
    white: '#ffffff'
  },
  text: {
    primary: 'rgb(38,38,38)'
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  success: {
    main: '#4caf50'
  }
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: paletteLight
    },
    dark: {
      palette: paletteDark
    }
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px rgba(0, 0, 0, 0.2)',
    '0px 8px 16px rgba(0, 0, 0, 0.2)',
    '0px 16px 24px rgba(0, 0, 0, 0.2)',
    '0px 24px 32px rgba(0, 0, 0, 0.2)',
    '0px 32px 40px rgba(0, 0, 0, 0.2)',
    '0px 40px 48px rgba(0, 0, 0, 0.2)',
    '0px 48px 56px rgba(0, 0, 0, 0.2)',
    '0px 56px 64px rgba(0, 0, 0, 0.2)',
    '0px 64px 72px rgba(0, 0, 0, 0.2)',
    '0px 72px 80px rgba(0, 0, 0, 0.2)',
    '0px 80px 88px rgba(0, 0, 0, 0.2)',
    '0px 88px 96px rgba(0, 0, 0, 0.2)',
    '0px 96px 104px rgba(0, 0, 0, 0.2)',
    '0px 104px 112px rgba(0, 0, 0, 0.2)',
    '0px 112px 120px rgba(0, 0, 0, 0.2)',
    '0px 120px 128px rgba(0, 0, 0, 0.2)',
    '0px 128px 136px rgba(0, 0, 0, 0.2)',
    '0px 136px 144px rgba(0, 0, 0, 0.2)',
    '0px 144px 152px rgba(0, 0, 0, 0.2)',
    '0px 152px 160px rgba(0, 0, 0, 0.2)',
    '0px 160px 168px rgba(0, 0, 0, 0.2)',
    '0px 168px 176px rgba(0, 0, 0, 0.2)',
    '0px 176px 184px rgba(0, 0, 0, 0.2)'
  ]
});

export default theme;
