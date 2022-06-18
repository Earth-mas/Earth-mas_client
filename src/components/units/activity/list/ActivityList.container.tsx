import styled from '@emotion/styled';
import ListCard from 'components/commons/card/list/ListCard';
// import MarketCard from 'components/commons/card/market/MarketCard';
// import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
// import { useState } from 'react';
import { listData } from './data';
import { v4 as uuidv4 } from 'uuid';

export default function ActivityList() {
  return (
    <Wrap>
      <CardWrap>
        {/* <ListCard /> */}
        {listData &&
          listData.map(el => (
            <ListCard
              key={uuidv4()}
              img={el.img}
              location={el.location}
              contents={el.contents}
              user={el.user}
              dday={el.dday}
            />
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
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 30px;
`;
