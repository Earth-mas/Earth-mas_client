import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { chat } from 'utils/APIRoutes';
import store from 'storejs';

export const ChatButton = (props: { userInfo?: any }) => {
  const accessToken = store.get('accessToken');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
        navigate('/chat');

        // queryClient.invalidateQueries('findmychat', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const joinChatRoom = () => {
    mutate();
  };

  return <button onClick={joinChatRoom}>채팅</button>;
};
