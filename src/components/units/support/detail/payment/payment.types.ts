import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { UseMutateFunction } from 'react-query';

export interface ISupportPaymentUIProps {
  paymentData: any;
  isComplete: boolean;
  data: {
    title: string;
    user: {
      name: string;
    };
  };
  setSelectAmount: Dispatch<SetStateAction<string>>;
  selectAmount: string;
  onClickPayment: (e: { preventDefault: () => void }) => void;
  supportPayment: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    { imp_uid: string }
  >;
}

export interface IPayment {
  apply_num: string;
  bank_name: string | null;
  buyer_addr: string;
  buyer_email: string;
  buyer_name: string;
  buyer_postcode: string;
  buyer_tel: string;
  card_name: string;
  card_number: string;
  card_quota: number;
  currency: string;
  custom_data: string | null;
  imp_uid: string;
  merchant_uid: string;
  name: string;
  paid_amount: number;
  paid_at: number;
  pay_method: string;
  pg_provider: string;
  pg_tid: string;
  pg_type: string;
  receipt_url: string;
  status: string;
  success: boolean;
  error_msg: string;
}
