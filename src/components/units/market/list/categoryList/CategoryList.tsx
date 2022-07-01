import styled from '@emotion/styled';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Pagination from 'components/commons/pagination';
import Title01 from 'components/commons/text/title/Title01';
import { Dispatch, Fragment } from 'react';
import { v4 as uuid4 } from 'uuid';
import { IMarketList } from '../MarketList.types';

interface ICategoryListProps {
  nowCategory: string;
  setSelect: Dispatch<React.SetStateAction<boolean>>;
  listData?: IMarketList[];
  clickPage: number;
  setClickPage: Dispatch<React.SetStateAction<number>>;
  ItemsAll: IMarketList[];
  refetchItemsAll: any;
}

export default function CategoryList(props: ICategoryListProps) {
  return (
    <>
      <header>
        <Title01 size="T" content={props.nowCategory} margin={35} />
        <Dropdown02 page={0} setSelect={props.setSelect} />
      </header>
      <CardWrap>
        {props.listData &&
          props.listData.map((el: IMarketCard) => (
            <Fragment key={uuid4()}>
              <MarketCard listData={el} />
            </Fragment>
          ))}
      </CardWrap>
      <Pagination
        clickPage={props.clickPage}
        listCount={props.ItemsAll?.length}
        page="list"
        refetch={props.refetchItemsAll}
        setClickPage={props.setClickPage}
      />
    </>
  );
}

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px 30px;
`;
