import styled from '@emotion/styled';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';
import { chat } from 'utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
// import chat from './chat.json';
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
    () => {
      return axios.post(`${chat}/getchat`, {
        roomid: props.data?.data[Number(props.roomid)]?.id,
      });
    },
    {
      onSuccess: res => {
        // console.log(res.data);
        setMessages(res.data);

        // queryClient.invalidateQueries('findroom', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  useEffect(() => {
    if (props.currentChat) {
      // props.socket.emit('user-load', {
      // });
      props.socket.on('user-load-emit', (data: any) => {
        // console.log(data);
        setMessages(data);
      });
    }
    mutate();
  }, [props.currentChat]);

  // 보내는 메시지
  const handleSendMsg = (msg: any) => {
    if (props.data?.data) {
      props.socket.emit('user-send', {
        userid: userInfo.id,
        name: userInfo.name,
        content: msg,
        roomid: props.data?.data[Number(props.roomid)]?.id,
      });
      console.log(msg);
    }

    // const msgs = [...messages];
    // // 메시지의 배열과 동일하도록 한 가지 작업을 수행
    // msgs.push({ id: userInfo.id, message: msg });
    // // currentUser가 보낸 메시지를 메시지 배열에 푸시
    // setMessages(msg);
    // console.log('msgs', msgs);
    // console.log('messages', messages);

    // msgs로 설정
  };

  /* useEffect(() => {
    return () => {
      props.socket.close();
    };
  }, []); */
  // console.log(props.data?.data[Number(props.roomid)]?.id);

  useEffect(() => {
    props.socket.on('user-send-emit', (msg: any) => {
      // console.log({ msg });
      setArrivalMessage(msg);
      // setMessages(msg);
      // 메시지를 수신하지 않았기에 false로 지정하고 메시지를 담아줌
    }); // 작성한 메시지를 수신
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
    // window.location.reload();
  }, [arrivalMessage]); // arrivalMessage와 이전 메시지를 배열에 담아줌

  useEffect(() => {
    // event?.stopImmediatePropagation();
    scrollRef.current?.scrollIntoView(/* { behavior: 'smooth' } */);
  }, [messages, data]); // 메시지에 변경사항이 있을 때마다 실행
  // console.log(messages);

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
          <ChatInput
            handleSendMsg={handleSendMsg}
            socket={props.socket}
            data={props.data}
          />
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
