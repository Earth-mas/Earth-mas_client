import styled from '@emotion/styled';
import store from 'storejs';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { useEffect, useState } from 'react';
import SupportCard from 'components/commons/card/support/SupportCard';
import { ISupportListProps } from 'components/units/support/list/SupportList.types';

export default function JoinedList() {
  const [listData, setListData] = useState<ISupportListProps[]>([]);
  const accessToken = store.get('accessToken');
  useEffect(() => {
    axiosApiInstance
      .post('/mypage/mysupporting', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => setListData(res.data));
  }, []);

  console.log(listData);
  return (
    <ListWrapper>
      {listData.length === 0 && <div>참여한 후원이 없습니다.</div>}
      {listData?.map((el: ISupportListProps) => (
        <SupportCard key={el.id} el={el} />
      ))}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 50px;
`;
