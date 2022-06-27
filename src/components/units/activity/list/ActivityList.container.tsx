import styled from '@emotion/styled';
import ListCard from 'components/commons/card/list/ListCard';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'components/commons/card/list/ListCard.types';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';

export interface IPropsActivityList {
  activitycategory: Activitycategory;
  activityjoin: Activityjoin;
  map: any;
  createAt: string;
  dday: string;
  deleteAt?: string;
  description: string;
  id: string;
  location: string;
  maxpeople?: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
  // nowCategory: string;
}

interface Activitycategory {
  category: string;
  createAt: string;
  deleteAt?: string;
  id: string;
}

interface Activityjoin {
  admin: string;
  id: string;
  user: User;
}

interface IPropsCategory {
  nowCategory: string;
}

export default function ActivityList(props: IPropsCategory) {
  const [activityListData, setActivityListData] =
    useState<IPropsActivityList>();

  const [select, setSelect] = useState<boolean>(false);

  const getActivityListData = async () => {
    await axios
      .post(
        `https://earth-mas.shop/server/activity/${
          select ? 'finddcs' : 'finddday'
        }`,
        { category: props.nowCategory, page: 1 },
      )
      .then(res => {
        setActivityListData(res.data);
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getActivityListData();
  }, [props.nowCategory, select]);

  console.log('데이톼: ', activityListData);

  return (
    <Wrap>
      <section>
        <header>
          <Title01 content={props.nowCategory} margin={35} size={'T'} />
          <Dropdown02 page={1} setSelect={setSelect} />
        </header>
        <CardWrap>
          {activityListData &&
            activityListData?.map((el: IPropsActivityList) => (
              <ListCard key={uuidv4()} el={el} />
            ))}
        </CardWrap>
      </section>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  header {
    display: flex;
    justify-content: space-between;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
