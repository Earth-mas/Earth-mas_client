export interface IItem {
  idx: number;
  name: string;
}

export interface IpaymentListElement {
  createdAt: string;
  user: { name: string; id: string };
  amount: number;
}
export interface IParticipationList {
  el: {
    createdAt: string;
    user: {
      name: string;
      id: string;
    };
    amount: number;
  };
}

export interface ISupported {
  amount: number;
  createdAt: string;
  donation: IDonation;
  id: string;
  impUid: string;
  status: string;
  user: IUser;
}

export interface IDonation {
  createAt: string;
  currentamount: number;
  dday: string;
  deletdAt: string | null;
  description: string;
  id: string;
  title: string;
  updatedAt: string;
  url: string;
  wishamount: number;
}
interface IUser {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete: string | null;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  updateAt: string;
  url: string;
}
