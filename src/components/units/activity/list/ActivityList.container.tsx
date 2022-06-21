import styled from '@emotion/styled';
import ListCard from 'components/commons/card/list/ListCard';
import { listData } from './data';
import { v4 as uuidv4 } from 'uuid';

export default function ActivityList() {
  return (
    <Wrap>
      <CardWrap>
        {listData && listData.map(el => <ListCard key={uuidv4()} el={el} />)}
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
`;
