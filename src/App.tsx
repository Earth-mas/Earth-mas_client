import { Routes, Route } from 'react-router-dom'
import { Global } from '@emotion/react'
import { globalStyles } from './styles/GlobalStyles'
import './App.css'
import ActivityPage from 'pages/Activity'
import MarketPage from 'pages/Market'
import MyPage from 'pages/MyPage'
import SignUpPage from 'pages/SignUp'
import SupportPage from 'pages/Support'

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </>
  )
}

export default App
