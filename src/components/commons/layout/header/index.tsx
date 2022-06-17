import Login from 'components/units/login';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontSize } from 'styles/FontStyles';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import UserProfile from 'components/commons/profile/profile';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const { url, name, id } = userInfo;
  return (
    <HeaderWrapper>
      <ContentsWrapper>
        <h1>Header</h1>
        {id ? (
          <span>
            <Link to="/mypage">
              <UserProfile size={30} avataUrl={url} name={name} />
            </Link>
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
`;
