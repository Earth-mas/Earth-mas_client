import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    id: '',
    name: '',
    email: '',
    url: '',
    addressnumber: '',
    address1: '',
    address2: '',
    phone: '',
  },
});

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});
