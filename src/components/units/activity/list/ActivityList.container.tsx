import styled from '@emotion/styled';
import ListCard from 'components/commons/card/list/ListCard';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'components/commons/card/list/ListCard.types';
import Title03 from 'components/commons/text/title/Title03';

export interface IPropsActivityList {
  activitycategory: Activitycategory;
  activityJoin: Activityjoin;
  map: any;
  createAt: string;
  dday: string;
  deleteAt?: any;
  description: string;
  id: string;
  location: string;
  maxpeople?: any;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
}

interface Activitycategory {
  category: string;
  createAt: string;
  deleteAt?: any;
  id: string;
}

interface Activityjoin {
  admin: string;
  id: string;
  user: User;
}

export default function ActivityList() {
  const [activityListData, setActivityListData] =
    useState<IPropsActivityList>();

  const getActivityListData = async () => {
    await axios
      .post(`https://earth-mas.shop/server/activity/finddcs`, { page: 1 })
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
  }, []);

  console.log('데이톼: ', activityListData);

  return (
    <Wrap>
      <section>
        <Title03 content="#전체" margin={35} />
        <CardWrap>
          {activityListData?.map((el: IPropsActivityList) => (
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
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
