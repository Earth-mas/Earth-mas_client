import { Dispatch, SetStateAction } from 'react';

export interface IPaginationProps {
  clickPage: number;
  setClickPage: Dispatch<SetStateAction<number>>;
  listCount: number;
  refetch: any;
  page: string;
}
export interface IPaginationStyleProps {
  clickPage: number;
  id: string;
}
export interface IPaginationPrevProps {
  startPage: number;
}
export interface IPaginationNextProps {
  startPage: number;
  lastPage: any;
}
