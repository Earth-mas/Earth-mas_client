import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { globalStyles } from 'styles/GlobalStyles';
import { Layout } from 'components/commons/layout';

import './App.css';
import HomePage from 'pages';
import MyPage from 'pages/myPage';
import SignUpPage from 'pages/signUp';

import ActivityPage from 'pages/activity';
import ActivityNewPage from 'pages/activity/new';
import ActivityDetailPage from 'pages/activity/[activityId]';
import ActivityEditPage from 'pages/activity/[activityId]/edit';

import MarketPage from 'pages/market';
import MarketNewPage from 'pages/market/new';
import MarketDetailPage from 'pages/market/[marketId]';
import MarketEditPage from 'pages/market/[marketId]/edit';

import SupportPage from 'pages/support';
import SupportNewPage from 'pages/support/new';
import SupportDetailPage from 'pages/support/[supportid]';
import SupportEditPage from 'pages/support/[supportid]/edit';
import SupportPaymentPage from 'pages/support/[supportid]/payment';

import useSetUser from 'hooks/useSetUser';
import ScrollToTop from 'commons/utils/scrolltotop';
import { ChatPage } from 'pages/chat';
import { AxiosInterceptor } from 'commons/utils/axiosInstance';
import MarketPaymentPage from 'pages/market/[marketId]/payment';
import PrivateRouteLayout from 'components/commons/privateRouter';

const App = () => {
  const queryClient = new QueryClient();

  useSetUser();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AxiosInterceptor>
          <Global styles={globalStyles} />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* 모든권한 접근가능페이지 */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />

                <Route path="/activity" element={<ActivityPage />} />
                <Route path="/activity/new" element={<ActivityNewPage />} />
                <Route path="/activity/:id" element={<ActivityDetailPage />} />
                <Route
                  path="/activity/:id/edit"
                  element={<ActivityEditPage />}
                />

                <Route path="/market" element={<MarketPage />} />
                <Route path="/market/:id" element={<MarketDetailPage />} />

                <Route path="/support" element={<SupportPage />} />
                <Route path="/support/:id" element={<SupportDetailPage />} />

                <Route path="/signup" element={<SignUpPage />} />
                <Route path="*" element={<div>404</div>} />
              </Route>

              {/* 권한분기 필요한 페이지 */}
              <Route element={<PrivateRouteLayout />}>
                <Route path="/activity/new" element={<ActivityNew />} />

                <Route path="/market/new" element={<MarketNewPage />} />
                <Route path="/market/:id/edit" element={<MarketEditPage />} />
                <Route
                  path="/market/:id/payment"
                  element={<MarketPaymentPage />}
                />

                <Route path="/support/new" element={<SupportNewPage />} />
                <Route path="/support/:id/edit" element={<SupportEditPage />} />
                <Route
                  path="/support/:id/payment"
                  element={<SupportPaymentPage />}
                />

                <Route path="/chat" element={<ChatPage />} />

                <Route path="/mypage" element={<MyPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AxiosInterceptor>
      </QueryClientProvider>
    </>
  );
};

export default App;
