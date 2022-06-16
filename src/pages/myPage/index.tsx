import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import UserInfo from 'components/units/myPage/user/MyPageUser.container';
import { useState } from 'react';
import { Colors } from 'styles/Colors';
import styled from '@emotion/styled';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';

interface IMenu {
  name: string;
  content: string | EmotionJSX.Element;
}

const MyPageWrapper = styled.div`
  display: flex;
  min-width: 1024px;
  justify-content: space-between;
  padding: 50px 0 145px 0;

  ul {
    width: 265px;
    height: 550px;
    border: 1px solid ${Colors.B80};
    border-radius: 5px;
    padding: 40px 5px;

    li {
      cursor: pointer;
    }
  }

  .contentWrapper {
    width: 720px;
    border: 1px solid ${Colors.B80};
    border-radius: 20px;
    padding: 70px 60px;
  }
`;

export default function MyPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const userInfo = useRecoilValue(userState);

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  const menuArr = [
    { name: '계정 설정', content: <UserInfo /> },
    { name: '액티비티', content: '내가 모집한 액티비티' },
    { name: '후원', content: '후원' },
    { name: '마켓', content: '마켓' },
  ];

  console.log(userInfo);

  return (
    <MyPageWrapper>
      <ul>
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
