import Login from 'components/units/login';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontSize } from 'styles/FontStyles';
import { userState } from 'recoil/user';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import UserProfile from 'components/commons/profile/profile';
import store from 'storejs';
import { useState } from 'react';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import axios from 'axios';
import axiosApiInstance from 'commons/utils/axiosInstance';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const { url, name, id } = userInfo;
  const resetUser = useResetRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => setIsOpen(prev => !prev);
  const accessToken = store.get('accessToken');

  const onClickLogout = () => {
    axiosApiInstance.post('auth/logout', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    store.remove('accessToken');
    setIsOpen(prev => !prev);
    resetUser();
  };

  return (
    <HeaderWrapper>
      <ContentsWrapper>
        {isOpen && (
          <Modal>
            <AlertModal
              onClickCancel={onClickModal}
              onClickOk={onClickLogout}
              title="💬 로그아웃"
              contents="로그아웃 하시겠습니까?"
              okMessage="로그아웃하기"
              cancelMessage="취소하기"
            />
          </Modal>
        )}
        <h1>Header</h1>
        {id ? (
          <span>
            <Link to="/mypage">
              <UserProfile size={30} avataUrl={url} name={name} />
            </Link>
            <button className="logoutBtn" onClick={onClickModal}>
              로그아웃
            </button>
          </span>
        ) : (
          <ul>
            <li>
              <Login />
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </ul>
        )}
      </ContentsWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
`;

const ContentsWrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    height: 40px;
    line-height: 40px;
    display: flex;
  }

  ul {
    display: flex;
    font-size: ${FontSize.SMALL};
    line-height: 40px;

    li {
      margin-left: 5px;
    }
  }

  .logoutBtn {
    margin-left: 20px;
  }
`;
