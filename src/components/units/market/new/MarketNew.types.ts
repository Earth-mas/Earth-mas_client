import { Dispatch } from 'react';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form/dist/types';
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

export interface IMarketNewUIProps {
  register: any;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onClickSubmit: SubmitHandler<FormValues>;
  onClickUpdate: SubmitHandler<FormValues>;
  onChangeQuill: any;
  itemData?: IMarketDetail;
  isEdit: boolean;
  isSelected?: string;
  setIsSelected: Dispatch<React.SetStateAction<string>>;
  contents?: string;
  urlString: string;
  setUrlString: Dispatch<React.SetStateAction<string>>;
}
