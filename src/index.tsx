import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from 'src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux_store';
import ModalController from './components/model/modal_controller';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import * as io from 'socket.io-client';
import { setSocket } from './redux_store/user/user_slice';
import { CPath } from './constants';
const { me } = store.getState().userSlice;
// 'ws://localhost:8000'
const socket = io.connect(CPath.HOST_SOCKET!, {
  query: {
    id_user: me?.id_user
  }
});
store.dispatch(setSocket(socket));
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Toaster position='top-center' />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
        <ModalController />
      </BrowserRouter>
    </CssVarsProvider>
  </Provider>
);
