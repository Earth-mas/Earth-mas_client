import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { LeftContainer, RightContainer, Wrapper } from './Chat.styles';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
// import Modal from 'components/commons/modal';
// import ModalMenu from '../login/LoginContents';
import { chat, host, userRoute } from 'utils/APIRoutes';
import io from 'socket.io-client';
import { BeforeChat } from './BeforeChat';
import axios from 'axios';
import { chatUserState } from 'recoil/chatUser';
import { useMutation, useQueryClient } from 'react-query';
import store from 'storejs';

export const Chat = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

  // const { url, name } = userInfo;
  const [contacts, setContacts] = useState([]);

  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [userId, setUserId] = useState<any>();
  const [roomid, setRoomid] = useState('');

  // const chatUser = useRecoilValue(chatUserState);
  const queryClient = useQueryClient();

  // const [isOpen, setIsOpen] = useState(true);

  // const socketRef = useRef<any>();
  // const io = require("socket.io-client");

  // const handleClick = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인을 해주세요');
      navigate('/');
    } else {
      const functionSetCurrentUser = () => {
        setCurrentUser(userInfo);
      };
      functionSetCurrentUser();
    }

    mutate();
  }, []);

  const socket = io(`${chat}`, {
    transports: ['websocket'],
    upgrade: false,
  });

  useEffect(() => {
    if (currentUser) {
      /* socket.on('connect', () => {
        // console.log(socket.id);
      }); */
      // socket.emit('user-send', currentUser.id);
      // 사용자가 로그인 할 때마다 사용자의 ID를 전달함
    }
    setContacts(
      userInfo.id !== data?.data[Number(roomid)].user1?.id
        ? data?.data[Number(roomid)].user1
        : data?.data[Number(roomid)].user2,
    );
  }, [currentUser]);

  const handleChatChange = (chat: SetStateAction<undefined>) => {
    setCurrentChat(chat); // 대화 내용이 currentChat에 담김
    // console.log(chat);
    setUserId(chat);
  };

  const { data, mutate } = useMutation(
    () => {
      return axios.post(`${chat}/findmychat`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    },
    {
      onSuccess: res => {
        console.log(res);
        // window.location.reload();

        // queryClient.invalidateQueries('detailList', { refetchInactive: true });
        // navigate(`/chat`);
      },
      onError: err => {
        console.log(err);
        // alert('필수 입력사항입니다');
      },
    },
  );

  const { data: clickUserId, mutate: createUserId } = useMutation(
    () => {
      return axios.post(
        `${chat}/finduser`,
        {
          user:
            userId?.user1.id === userInfo.id
              ? userId?.user2.id
              : userId?.user1.id,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        console.log(res);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  // console.log('userInfo', userInfo.id);
  // console.log(
  //   userId?.user1.id === userInfo.id ? userId?.user2.id : userId?.user1.id,
  // );
  // console.log(clickUserId?.url);

  /* console.log(
    userInfo.id !== data?.data[Number(roomid.index)].user1?.id &&
      data?.data[Number(roomid)].user1,
  ); */

  console.log(clickUserId);
  console.log(clickUserId?.data[0]?.url);

  return (
    <>
      <Wrapper>
        <LeftContainer>
          <div className="user">
            <div className="userImg">
              <img
                src={userInfo.url}
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">{userInfo.name}</p>
          </div>

          <ChatList
            // socket={socketRef}
            // setUserId={setUserId}
            // contacts={contacts}
            changeChat={handleChatChange}
            // currentUser={currentUser}
            data={data}
            roomid={roomid}
            setRoomid={setRoomid}
            // roomUser={roomUser}
            createUserId={createUserId}
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
                    // src="/images/profileDefault.png"
                    src={clickUserId?.data[0]?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
                <p className="userName">{clickUserId?.data[0]?.name}</p>
              </div>

              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                clickUserId={clickUserId}
                userId={userId}
                socket={socket}
                data={data}
                roomid={roomid}
              />
            </>
          )}
        </RightContainer>
      </Wrapper>
    </>
  );
};
