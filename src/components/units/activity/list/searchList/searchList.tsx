import ActivityCard from 'components/commons/card/activity/ActivityCard';
import { IActivityList } from '../ActivityList.types';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import Title01 from 'components/commons/text/title/Title01';

interface ISearchListProps {
  activityListData: IActivityList[] | undefined;
}

export default function SearchList(props: ISearchListProps) {
  return (
    <>
      <header>
        <Title01 size={'T'} content="검색 결과" margin={35} />
      </header>
      <CardWrap>
        {props.activityListData &&
          props.activityListData?.map((el: IActivityList) => (
            <ActivityCard key={uuidv4()} el={el} />
          ))}
      </CardWrap>
    </>
  );
}

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 27px;
`;
