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
  chat: number;
  user: {
    id: string;
    url: string;
    name: string;
  };
  roomId: string;
  content: string;
  updatedAt: string;
}
