import styled from '@emotion/styled';
import ListCard from 'components/commons/card/list/ListCard';
import { listData } from './data';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IPropsActivityList {
  map: any;
  activitycategory: Activitycategory;
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

export default function ActivityList() {
  const [activityListData, setActivityListData] =
    useState<IPropsActivityList>();
  const navigate = useNavigate();

  const getActivityListData = async () => {
    await axios
      .post(`https://earth-mas.shop/server/activity/finddcs`, { page: 1 })
      .then(res => {
        setActivityListData(res.data);
        navigate(`/activity/`);
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getActivityListData();
  }, []);
  return (
    <Wrap>
      <CardWrap>
        {activityListData &&
          activityListData?.map((el: IPropsActivityList) => (
            <ListCard key={uuidv4()} el={el} />
          ))}
      </CardWrap>
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
