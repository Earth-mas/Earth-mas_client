import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { LeftContainer, RightContainer, Wrapper } from './Chat.styles';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'recoil/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import Modal from 'components/commons/modal';
// import ModalMenu from '../login/LoginContents';
import { chat, host, userRoute } from 'utils/APIRoutes';
import io from 'socket.io-client';
import { BeforeChat } from './BeforeChat';
import axios from 'axios';
import { chatUserState } from 'recoil/chatUser';
import { useMutation } from 'react-query';
import store from 'storejs';

export const Chat = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

  // const { url, name } = userInfo;
  // const [contacts, setContacts] = useState([]);

  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const chatUser = useRecoilValue(chatUserState);
  // const [isOpen, setIsOpen] = useState(true);

  // const socketRef = useRef();
  // const io = require("socket.io-client");

  // const handleClick = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      console.log('유저정보 없음');
    } else {
      const functionSetCurrentUser = () => {
        setCurrentUser(userInfo);
      };
      functionSetCurrentUser();
    }
  }, []);

  const socket = io(`${host}/server/chat`, {
    // transports: ['websocket'],
    upgrade: false,
  });

  useEffect(() => {
    if (currentUser) {
      socket.on('connect', () => {
        console.log(socket.id);
      });
      // socket.emit('user-send', currentUser.id);
      // 사용자가 로그인 할 때마다 사용자의 ID를 전달함
    }
  }, [currentUser]);

  // console.log(currentUser);
  // console.log(currentUser.id);

  const handleChatChange = (chat: SetStateAction<undefined>) => {
    setCurrentChat(chat); // 대화 내용이 currentChat에 담김
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     const fetchData = async () => {
  //       const data = await axios.get(`${userRoute}/${currentUser._id}`);
  //       setContacts(data.data); // 유저에 대한 값
  //     };
  //     fetchData();
  //   } // 현재 사용자가 로드 된 후 호출할 것이기에 현재 사용자가 localStorage에서 가져와야하기 때문에
  // }, [currentUser]); // currentUser를 설정할 때마다 실행; // api 호출식

  const { data } = useMutation(
    () => {
      return axios.post(
        `${chat}/findmychat`,

        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        console.log(res);
        // navigate(`/support/${res.data.id}`);
      },
      onError: err => {
        console.log(err);
        // alert('필수 입력사항입니다');
      },
    },
  );

  return (
    <>
      {/* <ChatButton /> */}
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
            socket={socket}
            contacts={chatUser}
            changeChat={handleChatChange}
            currentUser={currentUser}
            data={data}
          />
        </LeftContainer>

        <RightContainer>
          {/* {data === undefined ? (
            <BeforeChat />
          ) : (
            <> */}
          <div className="user">
            <div className="userImg">
              <img
                src="/images/profileDefault.png"
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">너너너너</p>
          </div>

          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
          {/* </>
          )} */}
        </RightContainer>
      </Wrapper>
    </>
  );
};
