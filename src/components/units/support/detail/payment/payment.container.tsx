import axios from 'axios';
import { useState } from 'react';
import store from 'storejs';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { supportRoute, supporttrRoute } from 'utils/APIRoutes';
import SupportPaymentUI from './payment.presenter';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';

declare global {
  interface Window {
    IMP: string;
  }
}

export default function SupportPayment() {
  const { id } = useParams();
  const accessToken = store.get('accessToken');
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const [selectAmount, setSelectAmount] = useState('1000');
  const [completeData, setCompleteData] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const { data } = useQuery('detailList', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  /* useEffect(() => {
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
  }, []); */

  const { mutate: supportPayment } = useMutation(
    (rsp: { imp_uid: string }) => {
      return axios.post(
        supporttrRoute,
        { impUid: rsp.imp_uid, amount: Number(selectAmount), donation: id },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: res => {
        console.log(res);
        setIsComplete(true);
        setCompleteData(res);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const onClickPayment = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const IMP: any = window.IMP;

    IMP.init('imp76469515');

    IMP.request_pay(
      {
        // param
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '얼스마스',
        amount: Number(selectAmount),
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        buyer_tel: userInfo.phone,
        buyer_addr: userInfo.address1,
      },
      (rsp: any) => {
        // callback
        if (rsp.success) {
          supportPayment(rsp);
        } else {
          alert(rsp.error_msg);
          navigate(`/support/${id}`);
        }
      },
    );
  };

  return (
    <SupportPaymentUI
      data={data}
      selectAmount={selectAmount}
      setSelectAmount={setSelectAmount}
      onClickPayment={onClickPayment}
      supportPayment={supportPayment}
      isComplete={isComplete}
      completeData={completeData}
    />
  );
}
