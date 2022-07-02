import styled from '@emotion/styled';
import axios from 'axios';
import Blank from 'components/commons/blank/Blank';
import { NewButton } from 'components/commons/button/new/NewButton';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Slide from 'components/commons/slide';
import ActivityList from 'components/units/activity/list/ActivityList.container';
import { useState } from 'react';
import { activityRoute } from 'utils/APIRoutes';

export default function ActivityPage() {
  const [nowCategory, setNowCategory] = useState('전체');
  // const [search, setSearch] = useState('')

  // const onSearch = async () => {
  //   await axios.post(`${activityRoute}/${search}`).then(res=>{

  //   })
  // }

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
  height: 400px;
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
