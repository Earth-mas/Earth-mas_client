import { Dispatch, SetStateAction } from 'react';

export interface IChatListProps {
  setCurrentChat: Dispatch<SetStateAction<ICurrentChat | undefined>>;
  chatUserList: [ICurrentChat];
}

export interface IChatContainerProps {
  socketRef: {
    current: {
      emit: (
        arg0: string,
        arg1: { userid: string; name: string; content: string; roomid: string },
      ) => void;
      on: (arg0: string, arg1: (msg: string) => void) => void;
    };
  };
  currentChat: ICurrentChat | undefined;
  roomId: string | undefined;
}

export interface ChatInputProps {
  handleSendMsg: (arg0: string) => void;
}

export interface ICurrentChat {
  chat: string;
  user: {
    id: string;
    url: string;
    name: string;
  };
  roomId: string;
  content: string;
  updatedAt: string;
  max: number;
  join: number;
}

export interface IMessage {
  content: string;
  createdAt: string;
  name: string;
  roomid: string;
  url: string;
  userid: string;
  __v: number;
  _id: string;
}

export interface IUser {
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
export interface IDataList {
  userid: string;
  createdAt: string;
  content: string;
  name: string;
  id: string;
  url: string;
}

export interface IGroupChat {
  0: {
    activityjoin: [
      {
        0: {
          admin: string;
          createAt: string;
          deletdAt: string | null;
          id: string;
          updatedAt: string;
          user: IUser;
        };
      },
    ];
    createAt: string;
    dday: string;
    deleteAt: string | null;
    description: string;
    id: string;
    location: string;
    maxpeople: number;
    people: number;
    subdescription: string;
    title: string;
    updateAt: string;
    url: string;
  };
  1: IMessage;
}

export interface IPersonalChat {
  0: string;
  1: IUser;
  2: IMessage;
}
