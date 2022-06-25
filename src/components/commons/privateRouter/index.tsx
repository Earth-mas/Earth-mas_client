import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import store from 'storejs';
import Header from '../layout/header';
import Footer from '../layout/footer';

const PrivateRouteLayout = () => {
  const accessToken = store.get('accessToken');

  if (!accessToken) {
    alert('권한이 없습니다. 로그인해주세요.');
    return <Navigate to="/" />;
  }

  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  );
};

export default PrivateRouteLayout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
