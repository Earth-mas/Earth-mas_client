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

  // console.log(props.chatUserList.data);

  return (
    <ListContainer>
      {props.chatUserList?.data?.map((el: any, index: any) => {
        console.log(el);

        return (
          <Fragment key={el[0].id}>
            {el[0].user1?.id !== userInfo.id ? (
              <List
                className={`contact ${
                  index === props.roomid ? 'selected' : ''
                }`}
                onClick={() => changeCurrentChat(index, el[0])}
                id={index}
              >
                <div className="user">
                  <div className="userImg">
                    <img
                      src={el[0]?.user1?.url}
                      onError={e => {
                        e.currentTarget.src = '/images/profileDefault.png';
                      }}
                    />
                  </div>
                </div>

                <div className="userInfo">
                  <div className="name-date">
                    <p className="userName">{el[0]?.user1?.name}</p>
                    <p className="date">{el[0]?.user1?.createdAt}</p>
                  </div>
                  <p>{el[0]?.currentMsg}</p>
                </div>
              </List>
            ) : (
              <List
                className={`contact ${
                  index === props.roomid ? 'selected' : ''
                }`}
                onClick={() => changeCurrentChat(index, el[0])}
                id={index}
              >
                <div className="user">
                  <div className="userImg">
                    <img
                      src={el[0]?.user2?.url}
                      onError={e => {
                        e.currentTarget.src = '/images/profileDefault.png';
                      }}
                    />
                  </div>
                </div>

                <div className="userInfo">
                  <div className="name-date">
                    <p className="userName">{el[0]?.user2?.name}</p>
                    <p className="date">{el[0]?.user2?.createdAt}</p>
                  </div>
                  <p>{el[0]?.currentMsg}</p>
                </div>
              </List>
            )}
          </Fragment>
        );
      })}
    </ListContainer>
  );
};
