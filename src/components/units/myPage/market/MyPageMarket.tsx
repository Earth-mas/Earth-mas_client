import { useState } from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import LikeList from './like/like';
import BoughtList from './bought/bought';
import SellList from './sell/sell';

import { MyMarketWrapper } from './MyPageMarket.styles';
import { MarketIcon } from 'assets/svgs';

export default function MyPageMarket() {
  const [currentTab, setCurrentTab] = useState(Number);

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  const tabArr = [
    { name: '내가 찜한 상품', content: <LikeList /> },
    { name: '내가 구매한 상품', content: <BoughtList /> },
    { name: '내가 등록한 상품', content: <SellList /> },
  ];

  interface ITab {
    name: string;
    content: string | EmotionJSX.Element;
  }

  return (
    <MyMarketWrapper>
      <div className="mytitle">
        <MarketIcon />
        <h1>나의 마켓</h1>
      </div>
      <ul className="tabMenu">
        {tabArr.map((el: ITab, index: number) => (
          <li
            key={index}
            className={currentTab === index ? 'focusedTab' : 'submenuTab'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </ul>
      <div className="contentWrapper">{tabArr[currentTab].content}</div>
    </MyMarketWrapper>
  );
}
