import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { ChatWrapper, LeftContainer, RightContainer } from './Chat.styles';
import { useEffect, useRef, useState } from 'react';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { chat } from 'utils/APIRoutes';
import { io } from 'socket.io-client';
import { BeforeChat } from './BeforeChat';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import store from 'storejs';
import Scrollbars from 'react-custom-scrollbars';

export const Chat = () => {
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState<any>(undefined);
  const [roomid, setRoomid] = useState('');

  const queryClient = useQueryClient();
  const socketRef = useRef<any>(null);

  const { data: personalChatList, mutate } = useMutation(
    'findmychat',
    () => {
      return axios.get(`${chat}/findmychat`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
    {
      onSuccess: res => {
        // console.log(res);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  console.log(personalChatList);

  const { data: clickUserId, mutate: createUserId } = useMutation(
    'finduser',
    () => {
      return axios.post(
        `${chat}/finduser`,
        {
          user:
            currentChat?.user1.id === userInfo.id
              ? currentChat?.user2.id
              : currentChat?.user1.id,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        // console.log(res);
        queryClient.invalidateQueries('findmychat', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    mutate();
  }, []);
  useEffect(() => {
    if (userInfo.id.length > 0) return setCurrentUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(`${chat}`, {
        upgrade: false,
      });
      socketRef.current.emit('user-enter', {
        roomid: currentChat?.id,
        userid: userInfo.id,
      });
    }

    createUserId();
  }, [currentChat]);

  const scrollbarRef = useRef<Scrollbars>(null);

  return (
    <>
      <ChatWrapper>
        <LeftContainer>
          <div className="user">
            <div className="userImg">
              <img
                src={userInfo.url ? userInfo.url : ''}
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">{userInfo.name}</p>
          </div>

          <ChatList
            setCurrentChat={setCurrentChat}
            chatUserList={personalChatList}
            roomid={roomid}
            setRoomid={setRoomid}
          />
        </LeftContainer>

        <RightContainer>
          {currentChat === undefined ? (
            <BeforeChat />
          ) : (
            <>
              <div className="user">
                <div className="userImg">
                  <img
                    src={clickUserId ? clickUserId?.data[0]?.url : ''}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
                <p className="userName">{clickUserId?.data[0]?.name}</p>
              </div>

              <ChatContainer
                scrollRef={scrollbarRef}
                currentChat={currentChat}
                chatUserList={personalChatList}
                roomid={roomid}
                socketRef={socketRef}
                clickUserId={clickUserId}
              />
            </>
          )}
        </RightContainer>
      </ChatWrapper>
    </>
  );
};
