import { Dispatch, SetStateAction } from 'react';

export interface IPaginationProps {
  clickPage: number;
  setClickPage: Dispatch<SetStateAction<number>>;
  startPage: number;
  setStartPage: Dispatch<SetStateAction<number>>;
  listCount: number;
  refetch: any;
  page: string;
}
export interface IPaginationStyleProps {
  clickPage: number;
  id: string;
}
export interface IPrevArrowStyleProps {
  startPage: number;
}
export interface INextArrowStyleProps {
  startPage: number;
  lastPage: number;
}
