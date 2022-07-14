import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { chat } from 'utils/APIRoutes';
import axiosApiInstance from 'commons/utils/axiosInstance';

export const ChatButton = (props: {
  userInfo?: { id: string };
  content: string;
}) => {
  const navigate = useNavigate();

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
