import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketList } from 'components/units/market/list/MarketList.types';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';

export default function LikeList() {
  const [listData, setListData] = useState<IMarketList[]>([]);

  useEffect(() => {
    axiosApiInstance
      .get('/market/findmylike')
      .then(res => setListData(res.data));
  }, []);

  return (
    <ListWrapper>
      {listData.length === 0 && <div>찜한 상품이 없습니다.</div>}
      {listData?.map((el: IMarketCard) => (
        <MarketCard key={el.id} listData={el} />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 50px;
`;
