import { useState } from 'react';
import { MySupportWrapper } from './MyPageSupport.styles';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import CreateList from './created/created';
import JoinedList from './joined/joined';
import { SupportIcon } from 'assets/svgs';

export default function MyPageSupport() {
  const [currentTab, setCurrentTab] = useState(Number);

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  const tabArr = [
    { name: '내가 참여한 후원', content: <JoinedList /> },
    { name: '내가 등록한 후원', content: <CreateList /> },
  ];

  interface ITab {
    name: string;
    content: string | EmotionJSX.Element;
  }

  return (
    <MySupportWrapper>
      <div className="supporttitle">
        <SupportIcon />
        <h1>나의 후원</h1>
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
    </MySupportWrapper>
  );
}
