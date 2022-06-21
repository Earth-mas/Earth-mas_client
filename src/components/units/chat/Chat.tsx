import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { v4 as uuidv4 } from 'uuid';
import chatList from './chatList.json';
import { LeftContainer, RightContainer, Wrapper } from './Chat.styles';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import Modal from 'components/commons/modal';
import ModalMenu from '../login/LoginContents';
import { host } from 'utils/APIRoutes';
import { io } from 'socket.io-client';
import { BeforeChat } from './BeforeChat';

export const Chat = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  // const { url, name } = userInfo;
  const [contacts, setContacts] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState();

  const [isOpen, setIsOpen] = useState(true);

  const socketRef = useRef();
  // const io = require("socket.io-client");

  const handleClick = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      <Modal>
        <ModalMenu handleClose={handleClick} />;
      </Modal>;
    } else {
      const functionSetCurrentUser = () => {
        setCurrentUser(userInfo);
      };
      functionSetCurrentUser();
    }
  }, []);

  const socket = io(host, {
    transports: ['websocket'],
    upgrade: false,
  });

  useEffect(() => {
    if (currentUser) {
      // const socket = io(`${host}:8080`);
      /* socket.on('connect', () => {
        console.log(socket.id);
      }); */
      // socket.emit('user-send', currentUser.id);
      // 사용자가 로그인 할 때마다 사용자의 ID를 전달함
    }
  }, [currentUser]);

  console.log(currentUser);
  // console.log(currentUser.id);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // useEffect(() => {
  //   if (currentUser) {
  //     setCurrentUserImage(currentUser.url);
  //     setCurrentUserName(currentUser.name);
  //   }
  // }, [currentUser]); // 유저가 변경될 때마다 함수 실행
  const handleChatChange = (chat: SetStateAction<undefined>) => {
    setCurrentChat(chat); // 대화 내용이 currentChat에 담김
  };
  const changeCurrentChat = (
    index: SetStateAction<undefined>,
    contact: any,
  ) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  }; // 채팅을 클릭할 때마다 채팅 유저 리스트를 변경하여 현재 선택된 설정으로 되게

  return (
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

        <div className="listContainer">
          {chatList.map(el => (
            <ChatList key={uuidv4()} el={el} />
          ))}
        </div>
      </LeftContainer>

      <RightContainer>
        {currentChat === undefined ? (
          <BeforeChat />
        ) : (
          <>
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
            // socket={socket}
            // currentChat={currentChat}
            // userInfo={userInfo}
            />
          </>
        )}
      </RightContainer>
    </Wrapper>
  );
};
