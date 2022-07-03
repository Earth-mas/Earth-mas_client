import styled from '@emotion/styled';
import axios from 'axios';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import { ChangeEvent, useEffect, useState } from 'react';
import { IMarketList } from './MarketList.types';
import _ from 'lodash';
import { marketRoute } from 'utils/APIRoutes';
import { useQuery } from 'react-query';
import CategoryList from './categoryList/CategoryList';
import SearchList from './searchList/SearchList';

export default function MarketList() {
  const [listData, setListData] = useState<IMarketList[]>();
  const [nowCategory, setNowCategory] = useState('전체');

  const [select, setSelect] = useState<string>('findlike');

  const [keyword, setKeyword] = useState<string>();
  const [clickPage, setClickPage] = useState<number>(1);
  const [searchList, setSearchList] = useState<boolean>(false);

  const { data: ItemsSearch, refetch: refetchItemsSearch } = useQuery(
    ['getItemsSearch'],
    async () => {
      const result = await axios.post(`${marketRoute}/search`, {
        search: keyword,
      });
      return setListData(result.data);
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const getDebounce = _.debounce(data => {
    setKeyword(data);
    setSearchList(true);
  }, 1000);

  const { data: ItemsAll, refetch: refetchItemsAll } = useQuery(
    ['getItemsAll', clickPage],
    async () => {
      const result = await axios.post(`${marketRoute}/${select}`, {
        category: nowCategory,
        page: clickPage,
      });
      setListData(result.data.arr);
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setClickPage(1);
    setSearchList(false);
    refetchItemsAll();
  }, [nowCategory, select]);

  useEffect(() => {
    refetchItemsSearch();
  }, [keyword]);

  return (
    <Wrap>
      <div className="input-wrap">
        <Input02 placeholder="상품을 검색해주세요" onChange={onChangeSearch} />
      </div>
      <nav className="category">
        <Category page={0} setNowCategory={setNowCategory} />
      </nav>
      <main className="item-list">
        {!searchList && (
          <CategoryList
            nowCategory={nowCategory}
            setSelect={setSelect}
            listData={listData}
            clickPage={clickPage}
            setClickPage={setClickPage}
            ItemsAll={ItemsAll}
            refetchItemsAll={refetchItemsAll}
          />
        )}
        {searchList && <SearchList listData={listData} />}
      </main>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  .input-wrap {
    display: flex;
    justify-content: end;
  }
  header {
    display: flex;
    justify-content: space-between;
  }
`;
