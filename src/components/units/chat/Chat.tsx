import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { v4 as uuidv4 } from 'uuid';
import chatList from './chatList.json';
import { LeftContainer, RightContainer, Wrapper } from './Chat.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { BeforeChat } from './BeforeChat';

export const Chat = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  // const { url, name } = userInfo;
  // const [contacts, setContacts] = useState([]);
  // const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState('');

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
