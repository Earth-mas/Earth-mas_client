import { User } from '../detail/ActivityDetail.container';

export interface IActivityListProps {
  activitycategory: Activitycategory;
  activityjoin: Activityjoin[];
  map: any;
  createAt: string;
  dday: string;
  deleteAt?: string;
  description: string;
  id: string;
  location: string;
  maxpeople?: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
}

export interface Activitycategory {
  category: string;
  createAt: string;
  deleteAt?: string;
  id: string;
}

export interface Activityjoin {
  admin: string;
  id: string;
  user: User;
}
