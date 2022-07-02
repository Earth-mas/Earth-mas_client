import styled from '@emotion/styled';
import ActivityCard from 'components/commons/card/activity/ActivityCard';
import Title01 from 'components/commons/text/title/Title01';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IActivityListProps } from '../ActivityList.types';

interface IActivitySearchListProps {
  activityListData?: IActivityListProps;
  nowCategory?: string;
}

export default function ActivityCategoryList(props: IActivitySearchListProps) {
  console.log(props.activityListData);

  return (
    <>
      <header>
        <Title01 content={props.nowCategory} size={'T'} />
      </header>
      <CardWrap>
        {props.activityListData &&
          props.activityListData.map((el: IActivityListProps) => {
            <ActivityCard key={uuidv4()} el={el} />;
          })}
      </CardWrap>
    </>
  );
}

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
