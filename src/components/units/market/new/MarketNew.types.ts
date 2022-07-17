import { Dispatch } from 'react';
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form/dist/types';
import { IMarketDetail } from '../detail/MarketDetail.types';

export interface FormValues {
  title: string;
  stock: number;
  amount: number;
  discount?: number;
  minidescription: string;
  description?: string;
}

export interface IMarketNewProps {
  isEdit: boolean;
  itemData?: IMarketDetail;
}

export interface IMarketNewUIProps {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onClickSubmit: SubmitHandler<FormValues>;
  onClickUpdate: SubmitHandler<FormValues>;
  onChangeQuill: (value: string) => void;
  itemData?: IMarketDetail;
  isEdit: boolean;
  isSelected?: string;
  setIsSelected: Dispatch<React.SetStateAction<string>>;
  contents?: string;
  urlString: string;
  setUrlString: Dispatch<React.SetStateAction<string>>;
}

export interface INewVariables {
  title: string;
  minidescription: string;
  description?: string;
  amount: number;
  discount?: number;
  stock: number;
  url?: string;
  category: string;
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
