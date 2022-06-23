import { IMarketDetail } from '../detail/MarketDetail.types';

export interface FormValues {
  title?: string;
  stock?: number;
  amount?: number;
  discount?: number;
  minidescription?: string;
  description?: string;
}

export interface IMarketNewProps {
  isEdit: boolean;
  itemData?: IMarketDetail;
}

export interface IUpdateVariables {
  title?: string;
  minidescription?: string;
  description?: string;
  url?: string;
  amount?: number;
  discount?: number;
  stock?: number;
  category?: string;
}
