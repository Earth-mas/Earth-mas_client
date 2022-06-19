import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';
import { v4 as uuidv4 } from 'uuid';
import chat from './chat.json';
import { ChatInput } from './ChatInput';

export const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // 보내는 메시지 api post
  const handleSendMsg = async (msg: any) => {
    const msgs = [...messages];
    setMessages(msgs);
  };

  return (
    <Wrapper>
      <div>
        {chat.map(message => {
          return (
            <div /* ref={scrollRef} */ key={uuidv4()}>
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
                  /* message.fromSelf ? */ 'sended' /*  : 'recieved' */
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
