import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from 'storejs';

import { globalStyles } from 'styles/GlobalStyles';
import { Layout } from 'components/commons/layout';

import './App.css';
import HomePage from 'pages';
import MyPage from 'pages/myPage';
import SignUpPage from 'pages/signUp';

import ActivityPage from 'pages/activity';
import ActivityNew from 'components/units/activity/new/ActivityNew.container';
import ActivityDetail from 'components/units/activity/detail/ActivityDetail.container';

import MarketPage from 'pages/market';
import MarketNewPage from 'pages/market/new';
import MarketDetailPage from 'pages/market/[marketId]';
import MarketEditPage from 'pages/market/[marketId]/edit';

import SupportPage from 'pages/support';
import SupportNewPage from 'pages/support/new';
import SupportDetailPage from 'pages/support/[supportid]';
// import SupportEditPage from 'pages/support/[supportid]/edit';

import useSetUser from 'hooks/useSetUser';
import SupportEditPage from 'pages/support/[supportid]/edit';
import SupportPaymentPage from 'pages/support/[supportid]/payment';
import SupportCompletePage from 'pages/support/[supportid]/payment/complete';
import ScrollToTop from 'commons/utils/scrolltotop';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState } from 'recoil/user';
import axios from 'axios';

const App = () => {
  const queryClient = new QueryClient();
  const accessToken = useRecoilValue(accessTokenState);

  useSetUser();

  const axiosApiInstance = axios.create({
    baseURL: 'https://earth-mas.shop/server/',
  });

  // request를 보낼 때 atom의 accessToken 정보를 헤더에 저장
  /* eslint-disable @typescript-eslint/no-explicit-any */
  axiosApiInstance.interceptors.request.use(function (config: any) {
    config.headers['accessToken'] = 'Bearer ' + accessToken;
    return config;
  });

  // response를 받았을 때
  axiosApiInstance.interceptors.response.use(
    function (response) {
      console.log(response);
      return response;
    },
    // error가 발생했고 해당 error의 status가 401이라면
    async function (error) {
      if (error.response && error.response.status === 401) {
        // 기존의 originalRequest를 auth/refreshtoken 으로 전달해 토큰을 재발급
        try {
          const originalRequest = error.config;
          const data = await axiosApiInstance.get('auth/restore');
          // 토큰이 재발급 됐으면
          if (data) {
            console.log('토큰 재발급');
            // 재발급 받은 토큰은 다시 atom 저장을 하고
            const { accessToken } = data.data;
            const setAccessTokenState = useSetRecoilState(accessTokenState);
            setAccessTokenState(accessToken);
            // 하는김에 로컬스토리지에도 저장해봅니다......
            store.set('accessToken', accessToken);
            // 헤더 부분에서 토큰 정보를 변경하고 다시 originalRequest를 보냄.
            originalRequest.headers['accessToken'] = 'Bearer ' + accessToken;
            return await axiosApiInstance.request(originalRequest);
          }
        } catch (error) {
          console.log(error);
        }
        return Promise.reject(error);
      }
      // 403 이외의 오류가 들어온다면 토큰 재발급에 실패한것으로 처리
      return Promise.reject(error);
    },
  );

  axiosApiInstance.post('auth/restore');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/activity/new" element={<ActivityNew />} />
              <Route path="/activity/:id" element={<ActivityDetail />} />

              <Route path="/market" element={<MarketPage />} />
              <Route path="/market/new" element={<MarketNewPage />} />
              <Route path="/market/:id" element={<MarketDetailPage />} />
              <Route path="/market/:id/edit" element={<MarketEditPage />} />

              <Route path="/support" element={<SupportPage />} />
              <Route path="/support/new" element={<SupportNewPage />} />
              <Route path="/support/:id" element={<SupportDetailPage />} />
              <Route path="/support/:id/edit" element={<SupportEditPage />} />
              <Route
                path="/support/:id/payment"
                element={<SupportPaymentPage />}
              />
              <Route
                path="/support/:id/payment/complete"
                element={<SupportCompletePage />}
              />

              <Route path="/mypage" element={<MyPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<div>404</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
