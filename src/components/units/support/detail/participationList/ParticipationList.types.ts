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
