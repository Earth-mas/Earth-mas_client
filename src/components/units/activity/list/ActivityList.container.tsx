import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
import Input02 from 'components/commons/inputs/Input02';
import Category from 'components/commons/category/Category';
import { activityRoute } from 'utils/APIRoutes';
import { IActivityList } from './ActivityList.types';
import { useQuery } from 'react-query';
import SearchList from './searchList/searchList';
import CategoryList from './categoryList/CategoryList';
import axiosApiInstance from 'commons/utils/axiosInstance';
import _ from 'lodash';

export default function ActivityList() {
  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<string>('finddcs');
  const [clickPage, setClickPage] = useState(1);

  const [keyword, setKeyword] = useState('');

  const [activityListData, setActivityListData] = useState<IActivityList[]>();
  const [searchList, setSearchList] = useState<boolean>(false);

  // 검색 기능
  const getDebounce = _.debounce(data => {
    setKeyword(data);
    setSearchList(true);
  }, 500);

  const onSearch = async () => {
    await axiosApiInstance
      .post(`${activityRoute}/search`, { search: keyword })
      .then(res => {
        setActivityListData(res.data);
      })
      .catch(err => {
        console.log('검색에러:', err);
      });
  };
  const onchangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  useEffect(() => {
    onSearch();
  }, [keyword]);

  // 액티비티 리스트
  const { data: listData, refetch } = useQuery(
    ['activityList', clickPage],
    async () => {
      const getList = await axiosApiInstance.post(
        `${activityRoute}/${select}`,
        {
          category: nowCategory,
          page: clickPage,
        },
      );
      setActivityListData(getList.data.arr);
      return getList.data;
    },
    { keepPreviousData: true },
  );

  useEffect(() => {
    refetch();
    setClickPage(1);
    setSearchList(false);
  }, [nowCategory, select]);

  return (
    <>
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
          {searchList && searchList ? (
            <SearchList activityListData={activityListData} />
          ) : (
            <CategoryList
              activityListData={activityListData}
              nowCategory={nowCategory}
              setSelect={setSelect}
              clickPage={clickPage}
              setClickPage={setClickPage}
              listData={listData}
              refetch={refetch}
            />
          )}
        </section>
      </Wrap>
    </>
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
