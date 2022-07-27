import Login from 'components/units/login';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { userState } from 'recoil/user';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import UserProfile from 'components/commons/profile/profile';
import store from 'storejs';
import { useState } from 'react';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { Logo } from 'assets/svgs';
import { Colors } from 'styles/Colors';
import { AiOutlineMessage } from 'react-icons/ai';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const { url, name, id } = userInfo;
  const resetUser = useResetRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => setIsOpen(prev => !prev);

  const onClickLogout = () => {
    axiosApiInstance.post('auth/logout', null);
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
        <nav>
          <Logo className="logo" />
          <Link to={'/'}>Home</Link>
          <Link to="/activity">Activity</Link>
          <Link to="/support">Support</Link>
          <Link to="/market">Market</Link>
        </nav>
        <div className="sign">
          {id ? (
            <>
              <Link to="/mypage">
                <UserProfile size={30} avataUrl={url} name={name} />
              </Link>
              <Link to="/chat" className="chatIcon">
                <AiOutlineMessage />
              </Link>
              <button onClick={onClickModal}>로그아웃</button>
            </>
          ) : (
            <>
              <Login /> | <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
      </ContentsWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
`;

const ContentsWrapper = styled.div`
  max-width: 1024px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    grid-gap: 50px;
    align-items: center;
    display: flex;
    .logo {
      width: 200px;
      height: 38px;
    }
    a {
      font-size: ${FontSize.MEDIUM_T};
      font-family: ${FontFamily.BOLD};
      line-height: 40px;
      color: ${Colors.B100};
    }
  }
  div.sign {
    display: flex;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    span {
      font-size: ${FontSize.SMALL};
      font-family: ${FontFamily.SEMIBOLD};
      line-height: 40px;
      margin-right: 5px;
    }
    a {
      font-size: ${FontSize.SMALL};
      font-family: ${FontFamily.MEDIUM};
      line-height: 40px;
    }
    button {
      font-size: ${FontSize.SMALL};
      font-family: ${FontFamily.MEDIUM};
      line-height: 40px;
    }
    .chatIcon {
      line-height: 10px;
      svg {
        font-size: 30px;
        :hover {
          fill: ${Colors.SUB1};
        }
      }
    }
  }
`;
