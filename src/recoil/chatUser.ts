import { atom } from 'recoil';

export const chatUserState = atom({
  key: 'chatUserState',
  default: [
    {
      id: '',
      name: '',
      url: '',
    },
  ],
});
