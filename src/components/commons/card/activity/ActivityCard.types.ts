import { IPropsActivityList } from 'components/units/activity/list/ActivityList.container';

export interface IPropsActivityCardList {
  el: IPropsActivityList;
}

export interface User {
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
  url: string | undefined;
}
