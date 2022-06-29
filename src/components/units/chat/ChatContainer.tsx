import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';
import { chat } from 'utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import { ChatInput } from './ChatInput';
import store from 'storejs';

export const ChatContainer = (props: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');
  const scrollRef = useRef<any>();
  const queryClient = useQueryClient();

  const { data, mutate } = useMutation(
    ['getchat'],
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
        console.log(res);
        setMessages(res.data);

        queryClient.invalidateQueries('findmychat', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  console.log(data);

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
    props.socketRef.current.on('user-send-emit', (msg: any) => {
      setArrivalMessage(msg);
    }); // 작성한 메시지를 수신
    scrollRef.current?.scrollIntoView();
  }, [messages]); // 메시지에 변경사항이 있을 때마다 실행

  console.log(messages);
  console.log(arrivalMessage);

  return (
    <Wrapper>
      {props.currentChat && (
        <>
          <div>
            {messages?.map((message: any) => {
              return (
                <div
                  ref={scrollRef}
                  key={uuidv4()}
                  className={`messageWrap ${
                    message.userid === userInfo.id ? 'sended' : 'recieved'
                  }`}
                >
                  <div
                    className={`message ${
                      message.userid === userInfo.id ? 'sended' : 'recieved'
                    }`}
                  >
                    <div className="content">
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 0 15px 15px;
  overflow: hidden;

  > div {
    height: 530px;
    max-height: 530px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;

    > .messageWrap {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      :last-of-type {
        margin-bottom: 0;
      }
      &.sended {
        justify-content: flex-end;
        .message {
          .content {
            background-color: ${Colors.SUB1};
            color: ${Colors.BW};
          }
        }
        :first-of-type {
          .message {
            .content {
              border-top-right-radius: 0;
            }
          }
        }
      }
      &.recieved {
        justify-content: flex-start;
        .message {
          border-top-left-radius: 0;

          .content {
            background-color: ${Colors.B20};
            color: ${Colors.B100};
          }
        }
        &:first-of-type {
          .message {
            .content {
              border-top-left-radius: 0;
            }
          }
        }
      }
    }

    .message {
      width: auto;
      display: flex;
      align-items: center;

      .content {
        width: auto;
        padding: 10px 12px;
        font-size: ${FontSize.SMALL};
        border-radius: 17px;
        color: #d1d1d1;
      }
    }
  }
`;
