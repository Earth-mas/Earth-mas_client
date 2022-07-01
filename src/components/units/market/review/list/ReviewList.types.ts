export interface IReview {
  contents: string;
  createAt: string;
  deletdAt?: null;
  id: string;
  market: IMarket;
  score: number;
  updatedAt: string;
  url: string;
  user: IUser;
}

export interface IUser {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete?: null;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
  role: string;
  updateAt: string;
  url: string;
}

export interface IMarket {
  amount: number;
  createAt: string;
  delete?: null;
  description: string;
  discount: number;
  id: string;
  like: number;
  minidescription: string;
  reviewpeople: number;
  reviewscore: number;
  stock: number;
  title: string;
  updateAt: string;
  url: string;
}
