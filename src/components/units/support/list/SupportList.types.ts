import { Dispatch, SetStateAction } from 'react';
export interface ISupportListUIProps {
  list: { data: ISupportListProps[] } | any;
  setSelect: Dispatch<SetStateAction<boolean>>;
}
export interface ISupportListProps {
  createAt: string;
  currentamount: number;
  dday: string;
  deletdAt?: string | null;
  description: string;
  id: string;
  title: string;
  updatedAt: string;
  url: string;
  user: User;
  wishamount: number;
}

interface User {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete?: string | null;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  updateAt: string;
  url: string;
}
