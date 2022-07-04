export interface IGroupChat {
  activityjoin: IActivityjoin[];
  createAt: string;
  dday: string;
  deleteAt?: null;
  description: string;
  id: string;
  location: string;
  maxpeople: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
}

export interface IActivityjoin {
  admin: string;
  id: string;
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

export interface IChatUser {
  activityjoin: Activityjoin[];
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

export interface Activityjoin {
  activity: Activity;
  admin: string;
  id: string;
}

export interface Activity {
  createAt: string;
  dday: string;
  deleteAt?: any;
  description: string;
  id: string;
  location: string;
  maxpeople: number;
  people: number;
  subdescription: string;
  title: string;
  updateAt: string;
  url: string;
}
