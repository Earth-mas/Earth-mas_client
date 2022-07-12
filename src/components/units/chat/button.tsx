import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { chat } from 'utils/APIRoutes';
import axiosApiInstance from 'commons/utils/axiosInstance';

export const ChatButton = (props: {
  userInfo?: { id: string };
  content: string;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => {
      return axiosApiInstance.post(`${chat}/findroom`, {
        user: props.userInfo?.id,
      });
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

  return <button onClick={joinChatRoom}>{props.content}</button>;
};
