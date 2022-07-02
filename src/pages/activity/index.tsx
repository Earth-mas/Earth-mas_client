import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import { NewButton } from 'components/commons/button/new/NewButton';
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
      <ActivityList />
      <NewButton />
      <Blank height={200} />
    </>
  );
}

const Wrap = styled.div`
  height: 400px;
`;
