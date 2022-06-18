import styled from '@emotion/styled';
import axios from 'axios';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Title02 from 'components/commons/text/title/Title02';
import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

export default function MarketList() {
  const [listData, setListData] = useState<any>();

  const getItems = async () => {
    await axios
      .get(`https://earth-mas.shop/server/market/finddcs`)
      .then(res => {
        // console.log(res.data);
        setListData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getItems();
    // console.log(DetailData);
  }, []);

  return (
    <Wrap>
      <div className="input-wrap">
        <Input02 placeholder="상품을 검색해주세요" />
      </div>
      <section className="category">
        <Category page={0} />
      </section>
      <section className="item-list">
        <Title02 content="전체 인기상품" margin={35} />
        <CardWrap>
          {listData &&
            listData.map((el: IMarketCard) => (
              <MarketCard listData={el} key={uuid4()} />
            ))}
        </CardWrap>
      </section>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  .input-wrap {
    display: flex;
    justify-content: end;
  }
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
