export interface IChatListProps {
  roomid: any;
  setRoomid: (arg0: any) => void;
  setCurrentChat: (arg0: any) => void;
  createUserId: () => void;
  chatUserList: any;
}

export interface IChatContainerProps {
  chatUserList: any;
  roomid: string;
  socketRef: {
    current: {
      emit: (
        arg0: string,
        arg1: { userid: string; name: string; content: any; roomid: any },
      ) => void;
      on: (arg0: string, arg1: (msg: any) => void) => void;
    };
  };
  currentChat: any;
  ref: any;
}

export interface ChatInputProps {
  handleSendMsg: (arg0: string) => void;
}
