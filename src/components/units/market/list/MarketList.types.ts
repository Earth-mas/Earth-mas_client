export interface IMarketList {
  amount: number;
  createAt: string;
  delete?: null;
  description: string;
  discount: number;
  id: string;
  like: number;
  marketcategory: IMarketListCategory;
  minidescription: string;
  reviewpeople: number;
  reviewscore: number;
  stock: number;
  title: string;
  updateAt: string;
  url: string;
}

export interface IMarketListCategory {
  id: string;
  name: string;
  delete?: null;
  createAt: string;
  updateAt: string;
}
