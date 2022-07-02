import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { io } from 'socket.io-client';
import { activityRoute, chat } from 'utils/APIRoutes';
import { ActivityDetail } from '../activity/detail/ActivityDetail.container';
import {
  ChatWrapper,
  LeftContainer,
  RightContainer,
} from '../groupChat/groupChat.styles';
import GroupChatContainer from './container/groupChatContainer';
import store from 'storejs';

// interface IActivityGroupChatProps {
//   detailChatData?: ActivityDetail;
// }

// const socket = io.connect('https://earth-mas.shop/server/chat');

export default function GroupChat() {
  const userInfo = useRecoilValue(userState);
  const accessToken = store.get('accessToken');

  const getMyRoomChat = async () => {
    const temp = {
      param: null,
    };
    await axios
      .post(`${chat}/getMyRoomChat`, temp, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('res:', res);
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  useEffect(() => {
    getMyRoomChat();
  }, []);

  return (
    <>
      <ChatWrapper>
        <LeftContainer>
          <div className="user">
            <div className="userImg">
              <img
                src={userInfo ? userInfo.url : ''}
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p className="userName">{userInfo.name}</p>
          </div>
        </LeftContainer>
        <RightContainer>
          <div className="activity">
            <div className="activityImg">
              <img
                // src={clickUserId ? clickUserId?.data[0]?.url : ''}
                onError={e => {
                  e.currentTarget.src = '/images/profileDefault.png';
                }}
              />
            </div>
            <p>게시글 아이디 받아오는거 포기</p>
          </div>
          <GroupChatContainer />
        </RightContainer>
      </ChatWrapper>
    </>
  );
}
