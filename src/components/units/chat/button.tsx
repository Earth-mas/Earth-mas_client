/* import { io, Socket } from 'socket.io-client';
let socket: Socket;

export const ChatButton = () => {
  const joinChatRoom = (e: { target: { value: any } }) => {
    socket.emit('join room', {
      roomNum: e.target.value,
    });
    alert('채팅방입장');
  };

  return <button>채팅</button>;
};
 */

import React from 'react';

export const button = () => {
  return <div>button</div>;
};
