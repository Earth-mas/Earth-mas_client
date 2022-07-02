import { IGroupChat } from '../GroupChat.types';
import { ContainerWrapper } from './GroupChatContainer.styles';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { getTime } from 'commons/utils/utils';
import { chat } from 'utils/APIRoutes';
import store from 'storejs';
import axios from 'axios';
import { useEffect } from 'react';
import { GroupChatInput } from '../input/GroupChatInput';

interface IGroupChatContainerProps {
  currentChat?: IGroupChat;
  chatList?: IGroupChat[];
  roomid: string;
  socket: any;
  // socketRef: any;
}

export default function GroupChatContainer(props: IGroupChatContainerProps) {
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

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
        console.log('res:', res);
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
  };

  useEffect(() => {
    props.socket.on('room-send-emit', (msg: any) => {
      console.log(msg);
    });
  }, []);

  useEffect(() => {
    getChat();
  }, [props.currentChat]);

  return (
    <>
      {props.currentChat && (
        <ContainerWrapper>
          <GroupChatInput handleSendMsg={handleSendMsg} />
        </ContainerWrapper>
      )}
    </>
  );
}
