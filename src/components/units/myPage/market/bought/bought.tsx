import styled from '@emotion/styled';
import store from 'storejs';
import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';
import { useEffect, useState } from 'react';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import { IMarketList } from 'components/units/market/list/MarketList.types';

export default function BoughtList() {
  const [listData, setListData] = useState<IMarketList[]>([]);
  const accessToken = store.get('accessToken');
  useEffect(() => {
    axiosApiInstance
      .post('/mypage/boughtmarket', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => setListData(res.data));
  }, []);

  console.log(listData);
  return (
    <ListWrapper>
      {listData.length === 0 && <div>구매한 상품이 없습니다.</div>}
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
