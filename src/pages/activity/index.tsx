import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import { NewButton } from 'components/commons/button/new/NewButton';
import Category from 'components/commons/category/Category';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Input02 from 'components/commons/inputs/Input02';
import Slide from 'components/commons/slide';
import ActivityList from 'components/units/activity/list/ActivityList.container';
import { useState } from 'react';

export default function ActivityPage() {
  const [nowCategory, setNowCategory] = useState('전체');
  return (
    <>
      <Wrap>
        <Slide
          banner={[
            '/images/activity/banner/banner3.jpg',
            '/images/activity/banner/banner1.jpg',
            '/images/activity/banner/banner2.jpg',
          ]}
          slide={'main'}
        />
      </Wrap>
      <Blank height={50} />
      <Search>
        <Input02 placeholder="검색어를 입력해주세요" />
      </Search>
      <CategoryWrap>
        <Category page={1} setNowCategory={setNowCategory} />
      </CategoryWrap>
      <ActivityList nowCategory={nowCategory} />
      <NewButton />
      <Blank height={200} />
    </>
  );
}

const Wrap = styled.div`
  height: 500px;
`;

const CategoryWrap = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const Search = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: end;
`;
