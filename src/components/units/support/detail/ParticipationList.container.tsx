import * as S from './SupportDetail.styles';
import { ParticipationList } from './ParticipationList';

export const ParticipationListContainer = () => {
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
