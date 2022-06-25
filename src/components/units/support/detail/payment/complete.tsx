import * as S from './complete.styles';
import { getPrice } from 'commons/utils/utils';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import { Link } from 'react-router-dom';
import { ISupportCompleteProps } from './complete.types';

export default function SupportComplete(props: ISupportCompleteProps) {
  return (
    <S.Wrapper>
      <S.Top>
        <div className="circle">
          <i className="check"></i>
        </div>
        결제완료
      </S.Top>
      <p>"감사합니다. 기부금을 소중하게 사용하겠습니다."</p>
      <S.Line />
      <S.Bottom>
        <p>기부정보 확인</p>
        <div className="payment">
          <span>{getPrice(props.completeData?.data?.amount)}</span>
          <span>원 기부되었습니다.</span>
        </div>
        <div className="grid">
          <p>모금함명</p>
          <p>{props.completeData?.data?.donation?.title}</p>
          <p>단체명</p>
          <p>{props.completeData?.data?.donation?.user?.name}</p>
        </div>
        <Link to={'/support'} className="buttonWrap">
          <ContainedButton01 content="확인" color="main" />
        </Link>
      </S.Bottom>
    </S.Wrapper>
  );
}
