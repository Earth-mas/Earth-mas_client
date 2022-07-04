import { getTime } from 'commons/utils/utils';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Message } from './Chat.styles';

interface Props {
  message: {
    userid: string;
    createdAt: string;
    content: string;
    name: string;
    id: string;
  };
  scrollbarRef: any;
  clickUserId: any;
}

export const MessageList = (props: Props) => {
  const userInfo = useRecoilValue(userState);

  return (
    <Message
      className={props.message.userid === userInfo.id ? 'sended' : 'recieved'}
    >
      <div className="userImg">
        <img
          src={
            props.message?.userid === userInfo.id
              ? userInfo.url
              : props.message?.userid === props.clickUserId?.data[0]?.id
              ? props.clickUserId?.data[0]?.url
              : ''
          }
          onError={e => {
            e.currentTarget.src = '/images/profileDefault.png';
          }}
        />
      </div>

      <div className="contentWrap">
        <p className="userName">{props.message.name}</p>
        <div>
          <p className="time">{getTime(props.message.createdAt)}</p>
          <p className="content">{props.message.content}</p>
        </div>
      </div>
    </Message>
  );
};
