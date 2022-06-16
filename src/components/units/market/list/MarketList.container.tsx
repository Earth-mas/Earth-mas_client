import styled from '@emotion/styled';
import axios from 'axios';
import MarketCard from 'components/commons/card/market/MarketCard';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Title02 from 'components/commons/text/title/Title02';
import { DATA } from './MarketList.item.data';
export default function MarketList() {
  const fetchItems = async () => {
    await axios
      .patch(`https://earth-mas.shop/server/market/finddcs`)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  fetchItems();

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
          {DATA.map(el => (
            // <MarketListItem cardData={el} />
            <MarketCard cardData={el} />
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
