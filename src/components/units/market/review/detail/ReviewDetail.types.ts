export interface IReviewDetailProps {
  reviewsData: IMarketReviewDetail;
  refetch: any;
}

export interface IUser {
  address1: string;
  address2: string;
  addressnumber: string;
  createAt: string;
  delete?: any;
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
  delete?: any;
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

export interface IMarketReviewDetail {
  contents: string;
  createAt: string;
  deletdAt?: any;
  id: string;
  score: number;
  updatedAt: string;
  market: IMarket;
  user: IUser;
  url: string;
}
