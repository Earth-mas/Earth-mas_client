import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { chatUserState } from 'recoil/chatUser';
import io from 'socket.io-client';
import { chat, host } from 'utils/APIRoutes';
import store from 'storejs';

export const ChatButton = (props: { userInfo?: any }) => {
  const accessToken = store.get('accessToken');

  const navigate = useNavigate();
  const setChatUser = useSetRecoilState(chatUserState);

  const socket = io(`${host}/server/chat`, {
    // transports: ['websocket'],
    upgrade: false,
  });

  console.log(props.userInfo?.id);

  const { mutate } = useMutation(
    () => {
      return axios.post(
        `${chat}/findroom`,
        { user: props.userInfo?.id },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        console.log(res);
        // navigate(`/support/${res.data.id}`);
      },
      onError: err => {
        console.log(err);
        // alert('필수 입력사항입니다');
      },
    },
  );

  const joinChatRoom = () => {
    // setChatUser(props.userInfo);
    mutate();
    socket.emit('hello11', function (data: any) {
      console.log(data);
      console.log('채팅방입장');
    });

    // function

    // socket.emit('user-load', props.userInfo?.id);

    /* socket.emit('user-send', {
      name: props.userInfo?.name,
      content: 'dd',
      roomid: props.userInfo?.id,
    }); */
    /* socket.on('connect', () => {
      console.log(socket.id);
      console.log(socket.connected); // true
      // socket.emit('add-user', currentUser.id);

      socket.on('user-send-emit', function (data) {
        console.log(data);
      });
    }); */
    navigate('/chat');
  };

  return <button onClick={joinChatRoom}>채팅</button>;
};
