import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { io } from 'socket.io-client';
import { chat } from 'utils/APIRoutes';

export default function GroupChat() {
  // const socket = io.connect('https://earth-mas.shop/server/chat');

  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const [sendChat, setSendChat] = useState('');

  if (userInfo === undefined) {
    navigate('/');
  }

  const joinChat = async () => {
    await axios
      .post(`${chat}`)
      .then(res => {
        console.log(res);
        setSendChat(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Wrap>
        그룹채팅방입니다.
        <button onClick={joinChat}>버튼입니다.</button>
        결과: <p>{sendChat}</p>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  width: 100%;
`;
