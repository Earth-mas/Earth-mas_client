import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import Line from 'components/commons/line';
import Blank from 'components/commons/blank/Blank';
import UserInfo from 'components/units/myPage/user/MyPageUser.container';

import { MyPageWrapper } from './mypage.styles';
import MyPageMarket from 'components/units/myPage/market/MyPageMarket';
import MyPageActivity from 'components/units/myPage/activity/MyPageActivity';
import MyPageSupport from 'components/units/myPage/support/MyPageSupport';

interface IMenu {
  name: string;
  content: string | EmotionJSX.Element;
}

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const menuQuery = searchParams.getAll('menu');
  const [currentTab, setCurrentTab] = useState(Number(menuQuery));

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
    setSearchParams({ menu: String(index) });
  };

  const menuArr = [
    { name: '계정 설정', content: <UserInfo /> },
    { name: '마켓', content: <MyPageMarket /> },
    { name: '후원', content: <MyPageSupport /> },
    { name: '액티비티', content: <MyPageActivity /> },
  ];

  return (
    <MyPageWrapper>
      <ul className="mypageUl">
        <h1>MY PAGE</h1>
        <Line />
        <Blank height={20} />
        {menuArr.map((el: IMenu, index: number) => (
          <li
            key={index}
            className={currentTab === index ? 'focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </ul>
      <div className="contentWrapper">{menuArr[currentTab].content}</div>
    </MyPageWrapper>
  );
}
