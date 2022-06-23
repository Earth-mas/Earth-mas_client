import * as S from './SupportDetail.styles';
import { ParticipationList } from './ParticipationList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { supportRoute } from 'utils/APIRoutes';
import { useParams } from 'react-router-dom';

export const ParticipationListContainer = () => {
  const { id } = useParams();

  const { data: list } = useQuery('Support', async () => {
    const { data } = await axios.post(`${supportRoute}/supported`, { id: id });
    return data;
  });
  // console.log(list);

  return (
    <S.ParticipationList>
      <p className="title">참여내역</p>

      <p className="totalCount">
        총 <S.Sub1>12</S.Sub1>건이 기부되었습니다.
      </p>

      <ParticipationList />

      <p className="more">더보기</p>
    </S.ParticipationList>
  );
};
