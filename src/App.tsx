import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Global } from '@emotion/react'
import './App.css'
import HomePage from 'pages'
import ActivityPage from 'pages/activity'
import MarketPage from 'pages/market'
import MyPage from 'pages/myPage'
import SignUpPage from 'pages/signUp'
import SupportPage from 'pages/support'
import { globalStyles } from 'styles/GlobalStyles'

const App = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
