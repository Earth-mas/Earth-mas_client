import Dropdown04 from 'components/commons/dropdown/04/Dropdown04';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Bottom, Line, Top, Wrapper } from './payment.styles';

export default function SupportPaymentUI(props: {
  data: {
    title: string;
    user: {
      name: string;
    };
  };
  setSelectAmount: Dispatch<SetStateAction<string>>;
  selectAmount: string;
}) {
  const userInfo = useRecoilValue(userState);

  return (
    <Wrapper>
      <Top>
        <div className="circle">
          <i className="check"></i>
        </div>
        후원하기
      </Top>
      <p>"기부자님의 소중한 마음으로 놀라운 변화가 일어납니다."</p>
      <p>투명한 기부 후기로 그 변화를 소개하고 보답하겠습니다!</p>
      <Line />
      <Bottom>
        <div className="bottomLeft">
          <p>{props.data?.title}</p>
          <p>by {props.data?.user?.name}</p>
          <div className="grid">
            <p>이름</p>
            <p>{userInfo.name}</p>
            <p>핸드폰번호</p>
            <p>{userInfo.phone}</p>
            <p>결제 할 금액</p>
            <div className="amountWrap">
              <div className="amount">
                <Dropdown04 setSelectAmount={props.setSelectAmount} />
                <span>원</span>
              </div>
              <p>
                * 기부를 원하는 금액을 입력한 후{' '}
                <span className="point">'기부하기'</span> 버튼을 눌러주세요!
              </p>
            </div>
            <p>결제 수단</p>
            <p>카드결제</p>
          </div>
        </div>

        <div className="bottomRight">
          <div className="explain">
            <p>결제수수료 없이 100% 기부</p>
            <p>
              결제하신 금액은 기부시 별도 수수료 없이
              <br />
              <span className="point">단체로 100% 기부</span>됩니다.
            </p>
          </div>

          <form className="payment">
            <div className="contents">
              <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
              <div className="inputWrap">
                <input type="checkbox" />
                <label>유료이용약관동의</label>
              </div>
              <div className="rowGrid">
                <p>총 기부 금액</p>
                <p>{props.selectAmount}원</p>
              </div>
            </div>
            <button>기부하기</button>
          </form>
        </div>
      </Bottom>
    </Wrapper>
  );
}
