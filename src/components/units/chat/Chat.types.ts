export interface IChatListProps {
  setCurrentChat: (arg0: any) => void;
  chatUserList: any;
}

export interface IChatContainerProps {
  socketRef: {
    current: {
      emit: (
        arg0: string,
        arg1: { userid: string; name: string; content: string; roomid: string },
      ) => void;
      on: (arg0: string, arg1: (msg: any) => void) => void;
    };
  };
  currentChat: any;
  roomId: string;
}

export interface ChatInputProps {
  handleSendMsg: (arg0: string) => void;
}
