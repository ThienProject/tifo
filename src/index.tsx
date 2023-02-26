import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { ThemeProvider } from '@mui/material';
import theme from 'src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux_store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Toaster position='top-center' />
        <App />
      </BrowserRouter>
    </CssVarsProvider>
  </Provider>
);
