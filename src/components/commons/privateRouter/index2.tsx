import { Navigate, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import store from 'storejs';
import Header from '../layout/header';

const PrivateRouteLayout02 = () => {
  const accessToken = store.get('accessToken');

  if (!accessToken) {
    alert('권한이 없습니다. 로그인해주세요.');
    return <Navigate to="/" />;
  }

  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
    </LayoutWrapper>
  );
};

export default PrivateRouteLayout02;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
