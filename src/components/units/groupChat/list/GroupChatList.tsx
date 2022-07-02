import { Dispatch, Fragment, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { ListContainer, List } from './GroupChatList.styles';
import { IGroupChat } from '../GroupChat.types';

interface IChatListProps {
  roomid: string;
  setRoomid: Dispatch<React.SetStateAction<string>>;
  setCurrentChat: any;
  createUserId: string;
  chatList?: IGroupChat[];
}

export default function GroupChatList(props: IChatListProps) {
  const userInfo = useRecoilValue(userState);
  // const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (el: IGroupChat) => () => {
    props.setRoomid(el.id);
    props.setCurrentChat(el);
  }; // 채팅을 클릭할 때마다 채팅 유저 리스트를 변경하여 현재 선택된 설정으로 되게

  return (
    <ListContainer>
      {props.chatList?.map((el: IGroupChat) => (
        <Fragment key={el.id}>
          <List
            // className={`contact ${index === props.roomid ? 'selected' : ''}`}
            onClick={changeCurrentChat(el)}
            // id={index}
          >
            <div className="activity">
              <div className="activityImg">
                <img
                  src={el.url.split(',')[0]}
                  onError={e => {
                    e.currentTarget.src = '/images/profileDefault.png';
                  }}
                />
              </div>
            </div>
            <div className="activityInfo">
              <div className="name-date">
                <p className="activityTitle">{el.title}</p>
                {/* <p className="date">{el?.user1?.createdAt}</p> */}
              </div>
              {/* <p>{el?.currentMsg}</p> */}
            </div>
          </List>
        </Fragment>
      ))}
    </ListContainer>
  );
}
