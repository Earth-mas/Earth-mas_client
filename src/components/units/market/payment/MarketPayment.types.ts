export interface IRsp {
  apply_num: string;
  bank_name?: any;
  buyer_addr: string;
  buyer_email: string;
  buyer_name: string;
  buyer_postcode: string;
  buyer_tel: string;
  card_name?: any;
  card_number: string;
  card_quota: number;
  currency: string;
  custom_data?: any;
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
}
