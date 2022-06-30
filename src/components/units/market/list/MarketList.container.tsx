import styled from '@emotion/styled';
import axios from 'axios';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import { IMarketList } from './MarketList.types';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import _ from 'lodash';
import { marketRoute } from 'utils/APIRoutes';
import { useQuery } from 'react-query';
import Pagination from 'components/commons/pagination';

export default function MarketList() {
  const [listData, setListData] = useState<IMarketList[]>();

  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();
  const [clickPage, setClickPage] = useState<number>(1);

  const { data: ItemsSearch, refetch: getItemsSearch } = useQuery(
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
  }, 1000);

  const { data: ItemsAll, refetch: getItemsAll } = useQuery(
    ['getItemsAll', clickPage],
    async () => {
      const result = await axios.post(
        `${marketRoute}/${select ? 'finddcs' : 'findlike'}`,
        {
          category: nowCategory,
          page: clickPage,
        },
      );
      setListData(result.data.arr);
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    getItemsAll();
  }, [nowCategory, select]);

  useEffect(() => {
    getItemsSearch();
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
        <header>
          <Title01 size="T" content={`${nowCategory} `} margin={35} />
          <Dropdown02 page={0} setSelect={setSelect} />
        </header>
        <CardWrap>
          {listData &&
            listData.map((el: IMarketCard) => (
              <Fragment key={uuid4()}>
                <MarketCard listData={el} />
              </Fragment>
            ))}
        </CardWrap>
        <Pagination
          clickPage={clickPage}
          listCount={ItemsAll?.length}
          page="list"
          refetch={getItemsAll}
          setClickPage={setClickPage}
        />
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

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px 30px;
`;
