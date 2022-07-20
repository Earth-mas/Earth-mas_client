import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';

import { IMarketList } from 'components/units/market/list/MarketList.types';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';

import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';

export default function SellList() {
  const [listData, setListData] = useState<IMarketList[]>([]);

  const { mutate: getSoldList, isLoading } = useMutation(
    'getSoldList',
    async () => {
      return await axiosApiInstance.post('mypage/mymarket', null);
    },
    {
      onSuccess: res => setListData(res.data),
    },
  );

  useEffect(() => {
    getSoldList();
  }, []);

  return (
    <ListWrapper>
      {isLoading && <div>로딩 중...</div>}
      {listData?.length === 0 && <div>판매한 상품이 없습니다.</div>}
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
