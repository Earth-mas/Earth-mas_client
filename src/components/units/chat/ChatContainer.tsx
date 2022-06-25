import styled from '@emotion/styled';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';
import { v4 as uuidv4 } from 'uuid';
import chat from './chat.json';
import { ChatInput } from './ChatInput';

export const ChatContainer = (props: any) => {
  const [messages, setMessages] = useState<any>();
  const [arrivalMessage, setArrivalMessage] = useState({});
  const scrollRef = useRef<any>();

  // 보내는 메시지 api post
  const handleSendMsg = (msg: any) => {
    /* props.socket.emit('send-user', {
      to: props.currentChat._id,
      from: props.currentUser._id,
      message: msg,
    }); */
    props.socket.emit('user-send', {
      name: props.userInfo?.name,
      content: msg,
      roomid: '1',
    });

    const msgs = [...messages];
    // 메시지의 배열과 동일하도록 한 가지 작업을 수행
    // msgs.push({ fromSelf: true, message: msg });
    // currentUser가 보낸 메시지를 메시지 배열에 푸시
    setMessages(msgs);
    // msgs로 설정
  };

  useEffect(() => {
    if (props.socket.connect) {
      props.socket.on('user-send-emit', (msg: any) => {
        console.log({ msg });
        setArrivalMessage({ content: msg });
        // 메시지를 수신하지 않았기에 false로 지정하고 메시지를 담아줌
      }); // 작성한 메시지를 수신
    }
  }, []);

  /* useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]); */ // arrivalMessage와 이전 메시지를 배열에 담아줌

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // 메시지에 변경사항이 있을 때마다 실행

  return (
    <Wrapper>
      <div>
        {messages?.map((message: any) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div className="userImg">
                <img
                  src={message.user.url}
                  onError={e => {
                    e.currentTarget.src = '/images/profileDefault.png';
                  }}
                />
              </div>
              <div
                className={`message ${
                  /* message.fromSelf ? */ 'sended' /* : 'recieved' */
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  height: calc(100% - 65px);
  padding: 0 15px 15px;

  > div {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > div {
      width: 90%;
      /* width: 100%; */
      /* height: 100%; */
      display: flex;
      align-items: center;

      .userImg {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .message {
      width: auto;
      /* height: 100%; */
      /* display: flex; */
      /* align-items: center; */
      margin-left: 10px;

      .content {
        max-width: 90%;
        width: auto;
        /* overflow-wrap: break-word; */
        padding: 10px;
        font-size: ${FontSize.SMALL};
        border-radius: 1rem;
        color: #d1d1d1;
      }

      &.sended {
        justify-content: flex-end;
        .content {
          background-color: ${Colors.SUB1};
          color: ${Colors.BW};
        }
      }
      &.recieved {
        justify-content: flex-start;
        .content {
          background-color: ${Colors.B20};
        }
      }
    }
  }
`;
