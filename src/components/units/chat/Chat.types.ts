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

export interface IDataList {
  userid: string;
  createdAt: string;
  content: string;
  name: string;
  id: string;
  url: string;
}
