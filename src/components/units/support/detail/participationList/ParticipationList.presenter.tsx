import { getDate, getPrice } from 'commons/utils/utils';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { MyPayment, Sub2 } from '../SupportDetail.styles';
import { IParticipationList } from './ParticipationList.types';

export const ParticipationList = (props: IParticipationList) => {
  const userInfo = useRecoilValue(userState);

  return (
    <div className="list">
      <p className="date">{getDate(props.el?.createdAt)}</p>
      {props.el?.user?.id === userInfo.id && <MyPayment>나의 참여</MyPayment>}
      <span className="userName">{props.el?.user?.name}</span>
      <Sub2>{getPrice(props.el?.amount)}원</Sub2> <span>참여</span>
    </div>
  );
};
