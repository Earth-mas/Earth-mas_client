import { Fragment, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { IChatListProps } from './Chat.types';
import { ListContainer, List } from './Chat.styles';

export const ChatList = (props: any) => {
  const userInfo = useRecoilValue(userState);
  // const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index: any, contact: any) => {
    // setCurrentSelected(index);
    props.setRoomid(index);
    props.setCurrentChat(contact);
  }; // 채팅을 클릭할 때마다 채팅 유저 리스트를 변경하여 현재 선택된 설정으로 되게

  return (
    <ListContainer>
      {props.chatUserList?.data?.map((el: any, index: any) => (
        <Fragment key={el.id}>
          {el.user1?.id !== userInfo.id ? (
            <List
              className={`contact ${index === props.roomid ? 'selected' : ''}`}
              onClick={() => changeCurrentChat(index, el)}
              id={index}
            >
              <div className="user">
                <div className="userImg">
                  <img
                    src={el?.user1?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
              </div>

              <div className="userInfo">
                <div className="name-date">
                  <p className="userName">{el?.user1?.name}</p>
                  <p className="date">{el?.user1?.createdAt}</p>
                </div>
                <p>{el?.currentMsg}</p>
              </div>
            </List>
          ) : (
            <List
              className={`contact ${index === props.roomid ? 'selected' : ''}`}
              onClick={() => changeCurrentChat(index, el)}
              id={index}
            >
              <div className="user">
                <div className="userImg">
                  <img
                    src={el?.user2?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
              </div>

              <div className="userInfo">
                <div className="name-date">
                  <p className="userName">{el?.user2?.name}</p>
                  <p className="date">{el?.user2?.createdAt}</p>
                </div>
                <p>{el?.currentMsg}</p>
              </div>
            </List>
          )}
        </Fragment>
      ))}
    </ListContainer>
  );
};
