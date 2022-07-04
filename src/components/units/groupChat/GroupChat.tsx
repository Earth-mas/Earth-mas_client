import axios from 'axios';
import * as S from './GroupChat.styles';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { io } from 'socket.io-client';
import store from 'storejs';
import { chat } from 'utils/APIRoutes';

import GroupChatContainer from './container/GroupChatContainer';
import { IChatUser, IGroupChat } from './GroupChat.types';
import GroupChatList from './list/GroupChatList';

export default function GroupChat() {
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');
  const [chatList, setChatList] = useState<IGroupChat[]>();
  const [roomid, setRoomid] = useState<string>('');
  const [currentChat, setCurrentChat] = useState<IGroupChat>();
  const [chatUsers, setChatUsers] = useState<IChatUser[]>();

  const socket = io(`${chat}`);
  // 대소문자 변경
  const getChatList = async () => {
    await axios
      .post(`${chat}/get-my-roomchat`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('getChatList:', res.data);
        setChatList(res.data);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  const getChatUser = async () => {
    await axios
      .post(
        `${chat}/chat-roomuser`,
        { roomid },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('chatUsers:', res.data);
        setChatUsers(res.data);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };
  useEffect(() => {
    getChatUser();
    console.log(roomid);
    // socket.emit('room-enter', {
    //   roomid: roomid,
    // });
  }, [roomid]);

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <S.ChatWrapper>
      <S.LeftContainer>
        <div className="user">
          <div className="userImg">
            <img
              src={userInfo ? userInfo.url : ''}
              onError={e => {
                e.currentTarget.src = '/images/profileDefault.png';
              }}
            />
          </div>
          <p className="userName">{userInfo.name}</p>
        </div>
        <GroupChatList
          roomid={roomid}
          setRoomid={setRoomid}
          setCurrentChat={setCurrentChat}
          createUserId={''}
          chatList={chatList}
        />
      </S.LeftContainer>
      <S.RightContainer>
        <div className="activity">
          <div className="activityImg">
            <img
              src={currentChat ? currentChat.url.split(',')[0] : ''}
              onError={e => {
                e.currentTarget.src = '/images/profileDefault.png';
              }}
            />
          </div>
          <p className="activityTitle">
            {currentChat
              ? `${currentChat.title} ${chatUsers?.length}명`
              : '채팅을 선택해주세요'}
          </p>
        </div>
        <GroupChatContainer
          currentChat={currentChat}
          chatList={chatList}
          roomid={roomid}
          socket={socket}
          //  socketRef={socketRef}
        />
      </S.RightContainer>
    </S.ChatWrapper>
  );
}
