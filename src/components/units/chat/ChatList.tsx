import { Fragment, useState } from 'react';
import { IChatListProps, ICurrentChat } from './Chat.types';
import { ListContainer, List } from './Chat.styles';
import { getTime } from 'commons/utils/utils';

export const ChatList = (props: IChatListProps) => {
  const [roomId, setRoomId] = useState<number>(0);

  const changeCurrentChat = (index: number, contact: ICurrentChat) => {
    setRoomId(index);
    props.setCurrentChat(contact);
  }; // 채팅을 클릭할 때마다 채팅 유저 리스트를 변경하여 현재 선택된 설정으로 되게

  return (
    <ListContainer>
      {props.chatUserList?.map((el: ICurrentChat, index: number) => {
        return (
          <Fragment key={index}>
            <List
              className={`contact ${index === roomId ? 'selected' : ''}`}
              onClick={() => changeCurrentChat(index, el)}
            >
              <div className="user">
                <div className="userImg">
                  <img
                    src={el?.user?.url}
                    onError={e => {
                      e.currentTarget.src = '/images/profileDefault.png';
                    }}
                  />
                </div>
              </div>

              <div className="userInfo">
                <div className="nameWrap">
                  <div>
                    <p className="userName">{el?.user?.name}</p>
                    {el?.chat === 'groupChat' && (
                      <p className="joinPeople">
                        {el?.join}/{el?.max}
                      </p>
                    )}
                  </div>
                  <p className="date">{getTime(el?.updatedAt)}</p>
                </div>
                <p>{el?.content}</p>
              </div>
            </List>
          </Fragment>
        );
      })}
    </ListContainer>
  );
};
