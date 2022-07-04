import { IGroupChat } from '../GroupChat.types';
import { ContainerWrapper } from './GroupChatContainer.styles';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { getTime } from 'commons/utils/utils';
import { chat } from 'utils/APIRoutes';
import store from 'storejs';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { GroupChatInput } from '../input/GroupChatInput';
import { Socket } from 'socket.io-client';
//대소문자 변경
interface IGroupChatContainerProps {
  currentChat?: IGroupChat;
  chatList?: IGroupChat[];
  roomid: string;
  socket: Socket;
  // socketRef: any;
}

interface IMessage {
  content: string;
  createdAt: string;
  name: string;
  roomid: string;
  userid: string;
}

export default function GroupChatContainer(props: IGroupChatContainerProps) {
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatList = document.querySelector('.chat_list');

  const getChat = async () => {
    await axios
      .post(
        `${chat}/get-activitychat`,
        { roomid: props.roomid, page: 1 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('res:', res.data);
        setMessageList(res.data[1]);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  const handleSendMsg = (msg: any) => {
    props.socket.emit('room-send', {
      userid: userInfo.id,
      name: userInfo.name,
      content: msg,
      roomid: props.roomid,
    });

    // console.log(msg);
    // setMessageList(prev => [...prev, msg]);
    // scrollRef.current?.scrollIntoView({ block: 'end', inline: 'nearest' });
  };

  useEffect(() => {
    props.socket.on('room-send-emit', (msg: IMessage) => {
      // console.log('on : ', msg);
      setMessageList(prev => [...prev, msg]);

      // scrollRef?.current?.scrollIntoView({behvior: ''})
    });
    // chatList?.scrollTop = chatList?.scrollHeight;
  }, [props.socket.on]);

  useEffect(() => {
    getChat();
  }, [props.currentChat]);

  return (
    <>
      {props.currentChat && (
        <ContainerWrapper>
          <div
            // ref={scrollRef}
            className="chat_list"
          >
            {messageList?.map(el => (
              <div key={uuidv4()}>
                <div>작성자 : {el.name}</div>
                <div>내용 : {el.content}</div>
                <div>{getTime(el.createdAt)}</div>
                {/* <div>{el.userid}</div> */}
                =========================
              </div>
            ))}
          </div>
          <GroupChatInput handleSendMsg={handleSendMsg} />
        </ContainerWrapper>
      )}
    </>
  );
}
