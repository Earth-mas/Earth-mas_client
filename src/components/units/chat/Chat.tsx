import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import { ChatContainer } from './ChatContainer';
import { ChatList } from './ChatList';
import { ChatWrapper, LeftContainer, RightContainer } from './Chat.styles';
import { chat } from 'utils/APIRoutes';
import { useMutation, useQuery } from 'react-query';
import Scrollbars from 'react-custom-scrollbars';
import makeList from 'utils/makeList';
import { ChatInput } from './ChatInput';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { BeforeChat } from './BeforeChat';
import { ICurrentChat } from './Chat.types';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';

export const Chat = () => {
  const userInfo = useRecoilValue(userState);

  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState<ICurrentChat>();
  const [modal, setModal] = useState(false);

  const socketRef = useRef<any>(null);
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    if (userInfo.id.length > 0) return setCurrentUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    socketRef.current = io(`${chat}`, {
      upgrade: false,
    });
    if (currentUser && currentChat?.chat === 'personalChat') {
      socketRef.current.emit('user-enter', {
        roomid: currentChat?.roomId,
      });
    } else {
      socketRef.current.emit('room-enter', {
        roomid: currentChat?.roomId,
      });
    }

    setTimeout(() => {
      scrollbarRef.current?.scrollToBottom();
    }, 100);
  }, [currentChat]);

  const groupChat = async () => {
    const res = await axiosApiInstance.post(`${chat}/get-my-roomchat`);

    return res.data?.map((el: any) => {
      return {
        chat: 'groupChat',
        user: {
          id: el?.[0]?.id,
          url: el?.[0]?.url,
          name: el?.[0]?.description.replace(/[<]+[a-zA-Z/]+[>]/gi, ''),
        },
        roomId: el?.[0]?.id,
        content: el?.[1]?.content,
        updatedAt: el?.[1]?.createdAt
          ? el?.[1]?.createdAt
          : el?.[0]?.activityjoin?.[0].createAt,
        max: el?.[0]?.maxpeople,
        join: el?.[0]?.people,
      };
    });
  };
  const { data: groupChatList } = useQuery('getmyroomchat', groupChat);

  const personalChat = async () => {
    const res = await axiosApiInstance.get(`${chat}/findmychat`);

    return res.data?.map((el: any) => {
      return {
        chat: 'personalChat',
        user: {
          id: el?.[1]?.id,
          url: el?.[1]?.url,
          name: el?.[1]?.name,
        },
        roomId: el?.[0],
        content: el?.[2]?.content,
        updatedAt: el?.[2]?.createdAt ? el?.[2]?.createdAt : '',
      };
    });
  };
  const { data: personalChatList } = useQuery('findmychat', personalChat);

  // 보내는 메시지
  const handleSendMsg = (msg: string) => {
    currentChat?.chat === 'personalChat'
      ? socketRef.current.emit('user-send', {
          userid: userInfo.id,
          name: userInfo.name,
          content: msg,
          roomid: currentChat?.roomId,
        })
      : socketRef.current.emit('room-send', {
          userid: userInfo.id,
          name: userInfo.name,
          content: msg,
          roomid: currentChat?.roomId,
        });

    if (scrollbarRef.current) {
      setTimeout(() => {
        scrollbarRef.current?.scrollToBottom();
      }, 50);
    }
  };

  const listData = makeList([groupChatList, personalChatList]);

  const onClickOpenModal = () => {
    setModal(prev => !prev);
  };

  const { mutate: leaveChat } = useMutation(
    'chatDelete',
    () => {
      return currentChat?.chat === 'personalChat'
        ? axiosApiInstance.delete(`${chat}/user-chat/${currentChat?.roomId}`)
        : axiosApiInstance.delete(`${chat}/room-chat/${currentChat?.roomId}`);
    },
    {
      onSuccess: () => {
        setModal(prev => !prev);
        alert('채팅방이 삭제되었습니다');
        location.reload();
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  return (
    <>
      {modal && (
        <Modal>
          <AlertModal
            title="💬 채팅방 나가기"
            contents="채팅방에서 나가기를 하면 대화내용 및 채팅목록에서 삭제됩니다. 채팅방에서 나가시겠습니까?"
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={onClickOpenModal}
            onClickOk={leaveChat}
          />
        </Modal>
      )}
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

          <ChatList setCurrentChat={setCurrentChat} chatUserList={listData} />
        </LeftContainer>

        <RightContainer>
          {currentChat === undefined ? (
            <BeforeChat />
          ) : (
            <>
              <div className="rightTop">
                <div className="user">
                  <div className="userImg">
                    <img
                      src={currentChat?.user?.url}
                      onError={e => {
                        e.currentTarget.src = '/images/profileDefault.png';
                      }}
                    />
                  </div>
                  <p className="userName">{currentChat?.user?.name}</p>
                </div>
                <button className="leaveRoom" onClick={onClickOpenModal}>
                  나가기
                </button>
              </div>

              <div className="containerWrap">
                <ChatContainer
                  roomId={currentChat?.roomId}
                  ref={scrollbarRef}
                  currentChat={currentChat}
                  socketRef={socketRef}
                />

                <ChatInput handleSendMsg={handleSendMsg} />
              </div>
            </>
          )}
        </RightContainer>
      </ChatWrapper>
    </>
  );
};
