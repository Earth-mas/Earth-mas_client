import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

export const Layout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
