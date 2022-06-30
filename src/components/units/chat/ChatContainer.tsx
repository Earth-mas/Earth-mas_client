import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { chat } from 'utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import { ChatInput } from './ChatInput';
import store from 'storejs';
import { IChatContainerProps } from './Chat.types';
import { ContainerWrapper } from './Chat.styles';
import { getTime } from 'commons/utils/utils';

export const ChatContainer = (props: IChatContainerProps) => {
  const accessToken = store.get('accessToken');
  const userInfo = useRecoilValue(userState);

  const scrollRef = useRef<any>();

  const [messages, setMessages] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState({});

  const { mutate } = useMutation(
    'getchat',
    () => {
      return axios.post(
        `${chat}/getchat`,
        {
          roomid: props.chatUserList?.data[Number(props.roomid)]?.id,
          page: 1,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        setMessages(res.data);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  // 보내는 메시지
  const handleSendMsg = (msg: any) => {
    props.socketRef.current.emit('user-send', {
      userid: userInfo.id,
      name: userInfo.name,
      content: msg,
      roomid: props.chatUserList?.data[Number(props.roomid)]?.id,
    });
  };

  useEffect(() => {
    if (props.currentChat) {
      mutate();
    }
  }, [props.currentChat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]); // arrivalMessage와 이전 메시지를 배열에 담아줌

  useEffect(() => {
    props.socketRef?.current?.on('user-send-emit', (msg: any) => {
      setArrivalMessage(msg);
      // console.log(msg);
    }); // 작성한 메시지를 수신

    scrollRef.current?.scrollIntoView();
    window.scrollTo(0, 0);
  }, [messages]); // 메시지에 변경사항이 있을 때마다 실행

  // console.log(messages);

  return (
    <ContainerWrapper>
      {props.currentChat && (
        <>
          <div>
            {messages?.map((message: any) => (
              <div
                ref={scrollRef}
                key={uuidv4()}
                className={`messageWrap ${
                  message.userid === userInfo.id ? 'sended' : 'recieved'
                }`}
              >
                <div className="message">
                  <p className="time">{getTime(message.createdAt)}</p>
                  <p className="content">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      )}
    </ContainerWrapper>
  );
};
