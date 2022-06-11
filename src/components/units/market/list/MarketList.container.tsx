import styled from '@emotion/styled';
import Category from 'components/commons/category/Category';
import Input02 from 'components/commons/inputs/Input02';
import Title02 from 'components/commons/text/title/Title02';
import { Colors } from 'styles/Colors';
import MarketListItem from './MarketList.item';
import { DATA } from './MarketList.item.data';
export default function MarketList() {
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
        <ItemGridWrap>
          {DATA.map(el => (
            <MarketListItem el={el} />
          ))}
        </ItemGridWrap>
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

const ItemGridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
