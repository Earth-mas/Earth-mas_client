import styled from '@emotion/styled';
import ActivityCard from 'components/commons/card/activity/ActivityCard';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Input02 from 'components/commons/inputs/Input02';
import Category from 'components/commons/category/Category';
import { activityRoute } from 'utils/APIRoutes';
import _ from 'lodash';
import { IActivityListProps } from './ActivityList.types';
import ActivitySearchList from './activitySearchList/ActivitySearchList';
import ActivityCategoryList from './activityCategoryList/ActivityCatgoryList';
// import ActivitySearchList from './activitySearchList/ActivitySearchList';

export default function ActivityList() {
  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<boolean>(false);

  const [keyword, setKeyword] = useState('');

  const [activityListData, setActivityListData] =
    useState<IActivityListProps>();
  const [searchList, setSearchList] = useState<boolean>(false);

  // 액티비티 리스트
  const getActivityListData = async () => {
    await axios
      .post(
        `https://earth-mas.shop/server/activity/${
          select ? 'finddcs' : 'finddday'
        }`,
        { category: nowCategory, page: 1 },
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
    // setSearchList(false);
  }, [nowCategory, select]);

  // 검색 기능
  const getDebounce = _.debounce(data => {
    setKeyword(data);
    setSearchList(true);
  }, 1000);

  const onSearch = async () => {
    await axios
      .post(`${activityRoute}/search`, { search: keyword })
      .then(res => {
        console.log('res:', res);
        setActivityListData(res.data);
      })
      .catch(err => {
        console.log('검색에러:', err);
      });
  };
  const onchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
    // onSearch();
  };

  useEffect(() => {
    onSearch();
  }, [keyword]);

  return (
    <Wrap>
      <section>
        <div className="search">
          <Input02
            placeholder="검색어를 입력해주세요"
            onChange={onchangeSearch}
          />
        </div>
        <Category page={1} setNowCategory={setNowCategory} />
      </section>
      <section>
        <header>
          <Title01 content={nowCategory} margin={35} size={'T'} />
          <Dropdown02 page={1} setSelect={setSelect} />
        </header>
        <CardWrap>
          {activityListData &&
            activityListData.map((el: IActivityListProps) => (
              <ActivityCard key={uuidv4()} el={el} />
            ))}
          {/* {!searchList && (
          <ActivityCategoryList
            activityListData={activityListData}
            nowCategory={nowCategory}
          />
        )}
        {searchList && (
          <ActivitySearchList
            activityListData={activityListData}
            // setSelect={setSelect}
          />
        )} */}
        </CardWrap>
      </section>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  .search {
    display: flex;
    justify-content: end;
  }
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
