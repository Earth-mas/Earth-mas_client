import styled from '@emotion/styled';
import store from 'storejs';
import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';
import { useEffect, useState } from 'react';
import { IMarketList } from 'components/units/market/list/MarketList.types';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';

export default function SellList() {
  const [listData, setListData] = useState<IMarketList[]>([]);
  const accessToken = store.get('accessToken');
  useEffect(() => {
    axiosApiInstance
      .post('/mypage/mymarket', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => setListData(res.data));
  }, []);

  return (
    <ListWrapper>
      {listData.length === 0 && <div>판매한 상품이 없습니다.</div>}
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
