export interface IMarketCardProps {
  listData: IMarketCard;
}

export interface IMarketCard {
  amount: number;
  createAt: string;
  delete?: any;
  description: string;
  discount: number;
  id: string;
  like: number;
  marketcategory: IMarketCardCategory;
  minidescription: string;
  reviewpeople: number;
  reviewscore: number;
  stock: number;
  title: string;
  updateAt: string;
  url: string;
}

export interface IMarketCardCategory {
  id: string;
  name: string;
  delete?: any;
  createAt: string;
  updateAt: string;
}
