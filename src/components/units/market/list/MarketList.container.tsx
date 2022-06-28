import styled from '@emotion/styled';
import axios from 'axios';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import store from 'storejs';
import { IMarketList } from './MarketList.types';
import Title01 from 'components/commons/text/title/Title01';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import _ from 'lodash';
export default function MarketList() {
  const [listData, setListData] = useState<IMarketList[]>();
  const [, setMyListData] = useState<IMarketList[]>();
  const accessToken = store.get('accessToken');
  const [nowCategory, setNowCategory] = useState('전체');
  const [select, setSelect] = useState<boolean>(false);

  const getItemsSearch = async (data: string) => {
    await axios
      .post(`https://earth-mas.shop/server/market/search`, {
        search: data,
      })
      .then(res => {
        console.log(res);
        setListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  const getDebounce = _.debounce(data => {
    getItemsSearch(data);
    console.log(data);
  }, 1000);

  const getItemsAll = async () => {
    await axios
      .post(
        `https://earth-mas.shop/server/market/${
          select ? 'finddcs' : 'findlike'
        }`,
        {
          category: nowCategory,
          page: 1,
        },
      )
      .then(res => {
        console.log('all Data :', res.data.arr);
        console.log('all Data length :', res.data.length);
        setListData(res.data.arr);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getItemsMyLike = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/findmylike`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        // console.log('like Data :', res.data);
        setMyListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItemsAll();
    getItemsMyLike();
  }, [nowCategory, select]);

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
                <MarketCard
                  listData={el}
                  // myListData={myListData}
                />
              </Fragment>
            ))}
        </CardWrap>
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
