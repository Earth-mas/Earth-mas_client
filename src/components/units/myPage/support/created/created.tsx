import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';

import { ISupportListProps } from 'components/units/support/list/SupportList.types';

import axiosApiInstance from 'commons/utils/axiosInstance';
import SupportCard from 'components/commons/card/support/SupportCard';

export default function CreateList() {
  const [listData, setListData] = useState<ISupportListProps[]>([]);

  const { mutate: getCreatedActivity, isLoading } = useMutation(
    'getCreatedActivity',
    async () => {
      return await axiosApiInstance.post('mypage/mysupport', null);
    },
    {
      onSuccess: res => setListData(res.data),
    },
  );

  useEffect(() => {
    getCreatedActivity();
  }, []);

  return (
    <ListWrapper>
      {isLoading && <div>로딩 중...</div>}
      {listData?.length === 0 && <div>등록한 후원이 없습니다.</div>}
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
