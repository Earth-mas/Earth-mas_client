import * as S from '../SupportDetail.styles';
import { useQuery } from 'react-query';
import axios from 'axios';
import { supportRoute } from 'utils/APIRoutes';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ParticipationList } from './ParticipationList';
import { IpaymentListElement } from './ParticipationList.types';

export const ParticipationListContainer = () => {
  const { id } = useParams();

  const { data: paymentList } = useQuery('Support', async () => {
    const { data } = await axios.post(`${supportRoute}/supported`, {
      id: id,
      page: 1,
    });
    return data;
  });

  return (
    <S.ParticipationList>
      <p className="title">참여내역</p>

      <p className="totalCount">
        총 <S.Sub1>{paymentList?.length}</S.Sub1>건이 기부되었습니다.
      </p>
      {paymentList?.map((el: IpaymentListElement) => (
        <ParticipationList key={uuidv4()} el={el} />
      ))}

      <p className="more">더보기</p>
    </S.ParticipationList>
  );
};
