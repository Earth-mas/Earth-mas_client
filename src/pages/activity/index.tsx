import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Slide from 'components/commons/slide';
import ActivityList from 'components/units/activity/list/ActivityList.container';

export default function ActivityPage() {
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
        <Category page={1} />
      </CategoryWrap>
      <ActivityList />
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
`;

const Search = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: end;
`;
