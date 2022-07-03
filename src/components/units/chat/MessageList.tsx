import { getTime } from 'commons/utils/utils';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Message } from './Chat.styles';

export const MessageList = (props: any) => {
  const userInfo = useRecoilValue(userState);

  return (
    <Message
      // ref={props.scrollbarRef}
      key={props.message.userid}
      className={`message ${
        props.message.userid === userInfo.id ? 'sended' : 'recieved'
      }`}
    >
      <p className="time">{getTime(props.message.createdAt)}</p>
      <p className="content">{props.message.content}</p>
    </Message>
  );
};
