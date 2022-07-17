import { AxiosResponse } from 'axios';
import { UseMutateFunction } from 'react-query';

export interface ISupportDetailUIProps {
  data: {
    url: string;
    title: string;
    wishamount: number;
    currentamount: number;
    user: {
      name: string;
      url: string;
      id: string;
    };
    description: string;
  };
  percent: number;
  leftDay: number;
  deleteContent: UseMutateFunction<AxiosResponse<any, any>, unknown, void>;
  modal: boolean;
  openModal: () => void;
}
