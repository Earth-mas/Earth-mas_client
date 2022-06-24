import Line from 'components/commons/line';
import * as S from './MarketPayment.styles';

export default function MarketPayment() {
  return (
    <S.Wrapper>
      <S.Top>
        <div className="circle">
          <i className="check"></i>
        </div>
        결제하기
      </S.Top>
      <p>"구매자님의 소중한 마음으로 놀라운 변화가 일어납니다."</p>
      <p>낭비 없는 소비를 실천하는 당신과 함께하겠습니다</p>
      <Line color="#2C3131" margin={30} />
      <S.Bottom>
        <div className="bottomLeft">
          <p>[주방] NO 플라스틱 주방용품 키트</p>
          <p>
            에너지를 더해주는 아미노산과 식물 유래 전해질로 건강한 수분 보충
            어쩌구 저쩌구
          </p>
          <div className="grid">
            <p>주문자 이름</p>
            <p>김감자</p>
            <p>배송지</p>
            <p>서울시 구로구 디지털로 300, 13층 패스트파이브 코드캠프</p>
            <p>상품 금액</p>
            <p>15,600원</p>
            <p>배송비</p>
            <p>3,000원</p>
            <p>결제 수단</p>
            <p>카드결제</p>
          </div>
        </div>

        <div className="bottomRight">
          <div className="explain">
            <p>결제 수수료 없이 100% 판매자 수익</p>
            <p>
              결제하신 상품의 판매 수익은
              <span className="point"> 판매자에게 100% 전달</span>됩니다.
            </p>
          </div>

          <form
            className="payment"
            onSubmit={() => {
              alert('submit');
            }}
          >
            <div className="contents">
              <div className="inputWrap">
                <label className="checkbox">
                  <input type="checkbox" required />
                  <span className="checkbox-icon" />
                </label>
                <span className="checkbox-text">
                  위 상품의 판매조건을 명확히 확인하였으며, 구매 진행에
                  동의합니다. (전자상거래법 제8조 2항)
                </span>
              </div>
              <div className="rowGrid">
                <p>총 기부 금액</p>
                <p>13,600원</p>
              </div>
            </div>
            <button>기부하기</button>
          </form>
        </div>
      </S.Bottom>
    </S.Wrapper>
  );
}
