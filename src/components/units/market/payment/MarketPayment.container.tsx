import { getMoney } from 'commons/utils/getAmount';
import Line from 'components/commons/line';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import * as S from './MarketPayment.styles';
import { IRsp } from './MarketPayment.types';
import MarketComplete from './PaymentComplete';
import { useMutation, useQuery } from 'react-query';
import { marketRoute, marketTransactionRoute } from 'utils/APIRoutes';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function MarketPayment() {
  const userInfo = useRecoilValue(userState);
  const { id } = useParams();
  const [payAmount, setPayAmount] = useState(0);
  const [complete, setComplete] = useState(false);
  const [completeData, setCompleteData] = useState({ title: '', amount: 0 });

  const { data: detailData } = useQuery(
    ['getItem'],
    async () => {
      const result = await axiosApiInstance.get(`${marketRoute}/${id}`);
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const { mutate: marketTransaction } = useMutation(
    async (rsp: IRsp) => {
      const result = await axiosApiInstance.post(
        `${marketTransactionRoute}/create`,
        {
          impUid: rsp.imp_uid,
          amount: payAmount + 3000,
          marketnumber: 1,
          marketid: id,
        },
      );

      return result.data;
    },
    {
      onSuccess: res => {
        if (res.status === 'PAYMENT') {
          setComplete(true);
          setCompleteData({
            title: res.market.title,
            amount: Number(res.market.amount) + 3000,
          });
        }
      },
    },
  );

  const onClickPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const IMP: any = window.IMP;
    IMP.init('imp76469515');

    IMP.request_pay(
      {
        // param
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '얼스마스',
        amount: payAmount + 3000,
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        buyer_tel: userInfo.phone,
        buyer_addr: userInfo.address1,
        buyer_postcode: userInfo.addressnumber,
      },
      async (rsp: IRsp) => {
        console.log(rsp);
        if (rsp.success) {
          try {
            marketTransaction(rsp);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('결제 실패');
          location.reload();
        }
      },
    );
  };

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  useEffect(() => {
    if (detailData) setPayAmount(detailData?.amount);
  }, [detailData]);

  return (
    <>
      {complete ? (
        <MarketComplete completeData={completeData} />
      ) : (
        <S.Wrapper>
          <S.Top>
            <div className="circle">
              <i className="check"></i>
            </div>
            결제하기
          </S.Top>
          <p>"구매자님의 소중한 마음으로 건강한 변화가 일어납니다."</p>
          <p>낭비 없는 소비를 실천하는 당신과 함께하겠습니다</p>
          <Line color="#2C3131" margin={30} />
          <S.Bottom>
            <div className="bottomLeft">
              <p>
                [{detailData?.marketcategory.name}] {detailData?.title}
              </p>
              <p>{detailData?.minidescription}</p>
              <div className="grid">
                <p>주문자 이름</p>
                <p>{userInfo.name}</p>
                <p>배송지</p>
                <p>
                  {userInfo.address1}, {userInfo.address2}
                </p>
                <p>상품 금액</p>
                <p>{getMoney(detailData?.amount)}원</p>
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

              <form className="payment" onSubmit={onClickPayment}>
                <div className="contents">
                  <div className="inputWrap">
                    <label>
                      <input type="checkbox" required />위 상품의 판매조건을
                      명확히 확인하였으며, <br />
                      구매 진행에 동의합니다. (전자상거래법 제8조 2항)
                    </label>
                  </div>
                  <div className="rowGrid">
                    <p>총 결제 금액</p>
                    {<p>{getMoney(detailData?.amount + 3000)}원</p>}
                  </div>
                </div>
                <button type="submit">결제하기</button>
              </form>
            </div>
          </S.Bottom>
        </S.Wrapper>
      )}
    </>
  );
}
