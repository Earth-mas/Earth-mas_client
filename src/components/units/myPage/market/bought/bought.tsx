import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';

import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import { IMarketList } from 'components/units/market/list/MarketList.types';

import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';

export default function BoughtList() {
  const [listData, setListData] = useState<IMarketList[]>([]);

  const { mutate: getBoughtList, isLoading } = useMutation(
    'getBoughtList',
    async () => {
      return await axiosApiInstance.post('mypage/boughtmarket', null);
    },
    {
      onSuccess: res => setListData(res.data),
    },
  );

  useEffect(() => {
    getBoughtList();
  }, []);

  return (
    <ListWrapper>
      {isLoading && <div>로딩 중...</div>}
      {!isLoading && listData.length === 0 && '구매한 상품이 없습니다.'}
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
