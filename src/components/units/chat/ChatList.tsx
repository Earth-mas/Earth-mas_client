import styled from '@emotion/styled';
import axios from 'axios';
import {
  Fragment,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { chatUserState } from 'recoil/chatUser';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { chat } from 'utils/APIRoutes';
import { v4 as uuidv4 } from 'uuid';
import store from 'storejs';
import { userState } from 'recoil/user';
// import { userInfo } from 'os';

export const ChatList = (props: {
  currentUser: any;
  changeChat: (arg0: any) => void;
  // socket: { on: (arg0: string, arg1: (data: any) => void) => void };
  contacts: any;
  data?: any;
  roomUser?: any;
  setRoomid: any;
  setUserId: any;
  createUserId: any;
}) => {
  const accessToken = store.get('accessToken');
  const userInfo = useRecoilValue(userState);

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // const chatUser = useRecoilValue(chatUserState);

  /* useEffect(() => {
    if (props.currentUser) {
      setCurrentUserImage(props.currentUser?.url);
      setCurrentUserName(props.currentUser?.name);
    }
  }, [props.currentUser]); */ // 유저가 변경될 때마다 함수 실행

  const changeCurrentChat = (index: any, contact: any) => {
    setCurrentSelected(index);
    props.setRoomid(index);
    props.changeChat(contact);
    props.createUserId();
    // props.setUserId(contact);
    // console.log(contact);
  }; // 채팅을 클릭할 때마다 채팅 유저 리스트를 변경하여 현재 선택된 설정으로 되게

  /* props.socket.on('user-send-emit', function (data) {
    console.log(data);
  }); */

  // console.log('chatlist', props.contacts);

  return (
    <>
      {
        /* currentUserImage && currentUserName && */ <ListContainer>
          {
            /* props.roomUser?.data?.map(
            (
              el: {
                user1: {
                  url: string | undefined;
                  name: string;
                };
                currentMsg: string;
              },
              index: undefined,
            ) => (
              <List
                className={`contact ${
                  index === currentSelected ? 'selected' : ''
                }`}
                key={uuidv4()}
                onClick={() => changeCurrentChat(index, el)}
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
                    {/* <p className="date">{el?.user1?.createdAt}</p> 
                  </div>
                  <p>{el?.currentMsg}</p>
                </div>
              </List>
            ),
          ) || */
            props.data?.data?.map((el: any, index: any) => (
              // <ChatList el={el} />
              <Fragment key={uuidv4()}>
                {el.user1?.id === userInfo.id ? (
                  <List
                    className={`contact ${
                      index === currentSelected ? 'selected' : ''
                    }`}
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
                ) : (
                  <List
                    className={`contact ${
                      index === currentSelected ? 'selected' : ''
                    }`}
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
                )}
              </Fragment>
            ))
          }
        </ListContainer>
      }
    </>
  );
};

const ListContainer = styled.div`
  height: calc(100% - 65px);
  overflow-y: auto;
  :hover {
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: ${Colors.MAIN};
        width: 0.3rem;
        border-radius: 1rem;
      }
    }
  }

  > div {
    border-bottom: 1px solid ${Colors.B20};
    :last-of-type {
      border: 0;
    }
  }
`;
const List = styled.div`
  height: 65px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  :hover {
    background-color: rgba(0, 160, 91, 0.1);
  }
  .selected {
    background-color: rgba(0, 160, 91, 0.1);
  }

  .user {
    display: flex;
    align-items: center;

    .userImg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .userInfo {
    margin-left: 10px;
    overflow: hidden;

    .name-date {
      display: flex;
      align-items: center;
      .userName {
        font-size: ${FontSize.SMALL};
        font-family: ${FontFamily.BOLD};
        color: ${Colors.B100};
      }
      .date {
        margin-left: 8px;
        font-size: 0.75rem;
        font-family: ${FontFamily.SEMIBOLD};
        color: ${Colors.B60};
      }
    }

    > p {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.MEDIUM};
      color: ${Colors.B100};
    }
  }
`;
