import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { supportRoute } from 'utils/APIRoutes';
import SupportPaymentUI from './payment.presenter';

export default function SupportPayment() {
  const { id } = useParams();
  const [selectAmount, setSelectAmount] = useState('1,000');

  const { data } = useQuery('detailList', async () => {
    const { data } = await axios.get(`${supportRoute}/${id}`);
    return data;
  });

  return (
    <SupportPaymentUI
      data={data}
      selectAmount={selectAmount}
      setSelectAmount={setSelectAmount}
    />
  );
}
