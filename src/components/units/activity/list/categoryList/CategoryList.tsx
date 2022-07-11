import ActivityCard from 'components/commons/card/activity/ActivityCard';
import { IActivityList } from '../ActivityList.types';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02Copy from 'components/commons/dropdown/02/Dropdown02copy';
import { Dispatch, SetStateAction } from 'react';
import Pagination from 'components/commons/pagination';

interface ICategoryListProps {
  listData: IActivityList[];
  setSelect: Dispatch<SetStateAction<string>>;
  activityListData: IActivityList[] | undefined;
  nowCategory: string;
  clickPage: number;
  setClickPage: Dispatch<SetStateAction<number>>;
  refetch: any;
}

export default function CategoryList(props: ICategoryListProps) {
  return (
    <>
      <header>
        <Title01 size={'T'} content={props.nowCategory} margin={35} />
        <Dropdown02Copy page={1} setSelect={props.setSelect} />
      </header>
      <CardWrap>
        {props.activityListData &&
          props.activityListData?.map((el: IActivityList) => (
            <ActivityCard key={uuidv4()} el={el} />
          ))}
      </CardWrap>
      <Pagination
        clickPage={props.clickPage}
        setClickPage={props.setClickPage}
        listCount={props.listData?.length}
        refetch={props.refetch}
        page="list"
      />
    </>
  );
}

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 27px;
`;
