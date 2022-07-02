import styled from '@emotion/styled';
import ActivityCard from 'components/commons/card/activity/ActivityCard';
import { IPropsActivityCardList } from 'components/commons/card/activity/ActivityCard.types';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Title01 from 'components/commons/text/title/Title01';
import { Dispatch, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IActivityListProps } from '../ActivityList.types';

interface IActivitySearchListProps {
  activityListData?: IActivityListProps;
  //   setSelect: Dispatch<React.SetStateAction<boolean>>;
}

export default function ActivitySearchList(props: IActivitySearchListProps) {
  console.log(props.activityListData);

  return (
    <>
      {/* <header>
        <Title01 size="T" content="검색결과" margin={35} />
        <Dropdown02 page={1} setSelect={props.setSelect} />
      </header> */}
      <CardWrap>
        sdafasdf
        {props.activityListData &&
          props.activityListData.map((el: IActivityListProps) => {
            <Fragment key={uuidv4()}>
              <ActivityCard el={el} />
            </Fragment>;
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
