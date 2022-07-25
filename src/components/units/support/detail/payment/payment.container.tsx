import axios from 'axios';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { supportRoute, supporttrRoute } from 'utils/APIRoutes';
import SupportPaymentUI from './payment.presenter';
import { userState } from 'recoil/user';
import { useRecoilValue } from 'recoil';
import axiosApiInstance from 'commons/utils/axiosInstance';
import { IPayment } from './payment.types';

declare global {
  interface Window {
    IMP: {
      init: (arg0: string) => void;
      request_pay: (
        arg0: {
          pg: string;
          pay_method: string;
          name: string;
          amount: string;
          buyer_email: string;
          buyer_name: string;
          buyer_tel: string;
          buyer_addr: string;
        },
        arg1: (rsp: IPayment) => void,
      ) => void;
    };
  }
}

export default function SupportPayment() {
  const { id } = useParams();
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();

  const [selectAmount, setSelectAmount] = useState('1000');
  const [isComplete, setIsComplete] = useState(false);

  const { data } = useQuery('detailList', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  const { mutate: supportPayment, data: paymentData } = useMutation(
    (rsp: { imp_uid: string }) => {
      return axiosApiInstance.post(supporttrRoute, {
        impUid: rsp.imp_uid,
        amount: Number(selectAmount),
        donation: id,
      });
    },
    {
      onSuccess: () => {
        setIsComplete(true);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const onClickPayment = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const IMP = window.IMP;

    IMP.init('imp76469515');
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        name: '얼스마스',
        amount: selectAmount,
        buyer_email: userInfo.email,
        buyer_name: userInfo.name,
        buyer_tel: userInfo.phone,
        buyer_addr: userInfo.address1,
      },
      (rsp: IPayment) => {
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
      paymentData={paymentData}
    />
  );
}
