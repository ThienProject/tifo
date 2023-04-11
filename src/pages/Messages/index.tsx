import React from 'react';
import * as io from 'socket.io-client';
import { CPath } from 'src/constants';
import Messages from './Messages';
const index = () => {
  const socket = io.connect(CPath.host || 'http://localhost:8000');
  return (
    <>
      <Messages socket={socket} />
    </>
  );
};

export default index;
