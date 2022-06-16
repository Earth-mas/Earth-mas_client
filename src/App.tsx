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
import ActivityList from 'components/units/activity/list/ActivityList.container';
import ActivityNew from 'components/units/activity/new/ActivityNew.container';
import ActivityDetail from 'components/units/activity/detail/ActivityDetail.container';

import MarketPage from 'pages/market';
import MarketDetail from 'components/units/market/detail/MarketDetail.container';
import MarketNew from 'components/units/market/new/MarketNew.container';

import SupportPage from 'pages/support';
import SupportNewPage from 'pages/support/new';
import SupportDetailPage from 'pages/support/[supportid]';
import SupportEditPage from 'pages/support/[supportid]/edit';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />

        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/activity/list" element={<ActivityList />} />
              <Route path="/activity/new" element={<ActivityNew />} />
              <Route path="/activity/:id" element={<ActivityDetail />} />

              <Route path="/market" element={<MarketPage />} />
              <Route path="/market/new" element={<MarketNew />} />
              <Route path="/market/:id" element={<MarketDetail />} />

              <Route path="/support" element={<SupportPage />} />
              <Route path="/support/new" element={<SupportNewPage />} />
              <Route path="/support/:id" element={<SupportDetailPage />} />
              <Route path="/support/:id/edit" element={<SupportEditPage />} />

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
