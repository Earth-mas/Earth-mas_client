import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import UserInfo from 'components/units/myPage/user/MyPageUser.container';
import { useState } from 'react';
import { Colors } from 'styles/Colors';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';

import { FontSize } from 'styles/FontStyles';
import Line from 'components/commons/line';
import Blank from 'components/commons/blank/Blank';

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
    { name: '액티비티', content: '내가 모집한 액티비티' },
    { name: '후원', content: '후원' },
    { name: '마켓', content: '마켓' },
  ];

  return (
    <MyPageWrapper>
      <ul>
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
const MyPageWrapper = styled.div`
  display: flex;
  min-width: 1024px;
  justify-content: space-between;
  padding: 50px 0 145px 0;
  color: ${Colors.B100};

  ul {
    width: 265px;
    height: 450px;
    box-shadow: ${Colors.B40} 0 7px 16px;
    border-radius: 20px;
    padding: 40px 20px;
    .focused {
      border: 1px solid ${Colors.SUB1};
      color: ${Colors.SUB1};
    }
    .submenu {
      cursor: pointer;
    }
    .profile {
      padding: 20px 40px;
    }

    li {
      border: 1px solid ${Colors.B80};
      margin-bottom: 10px;
      padding: 0 20px;
      font-size: ${FontSize.MEDIUM_C};
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 5px;
      :hover {
        border: 1px solid ${Colors.SUB1};
        color: ${Colors.SUB1};
      }
    }

    h1 {
      font-size: ${FontSize.MEDIUM_T};
      padding-bottom: 20px;
    }
  }

  .contentWrapper {
    width: 720px;
    border-radius: 20px;
    padding: 20px 30px;
  }
`;
