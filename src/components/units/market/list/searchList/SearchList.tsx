import styled from '@emotion/styled';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Title01 from 'components/commons/text/title/Title01';
import { Fragment } from 'react';
import { v4 as uuid4 } from 'uuid';
import { IMarketList } from '../MarketList.types';

interface ISearchListProps {
  listData?: IMarketList[];
}

export default function SearchList(props: ISearchListProps) {
  return (
    <>
      <header>
        <Title01 size="T" content="검색 결과" margin={35} />
      </header>
      <CardWrap>
        {props.listData &&
          props.listData.map((el: IMarketCard) => (
            <Fragment key={uuid4()}>
              <MarketCard listData={el} />
            </Fragment>
          ))}
      </CardWrap>
    </>
  );
}

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px 30px;
`;
