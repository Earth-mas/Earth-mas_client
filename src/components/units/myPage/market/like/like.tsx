import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axiosApiInstance from 'commons/utils/axiosInstance';
import MarketCard from 'components/commons/card/market/MarketCard';
import { IMarketList } from 'components/units/market/list/MarketList.types';
import { IMarketCard } from 'components/commons/card/market/MarketCard.types';
import { useQuery } from 'react-query';

export default function LikeList() {
  const [listData, setListData] = useState<IMarketList[]>([]);

  const getMyLike = async () => {
    const result = await axiosApiInstance.get('market/findmylike');
    return result.data;
  };

  const { refetch, isRefetching } = useQuery('getMyLike', getMyLike, {
    enabled: false,
    onSuccess: data => setListData(data),
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ListWrapper>
      {isRefetching && <div>로딩 중...</div>}
      {listData?.length === 0 && <div>찜한 상품이 없습니다.</div>}
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
