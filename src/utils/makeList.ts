interface IChatList {
  0: [IGroupChatList];
  1: [IPersonalChatList];
}
interface IGroupChatList {
  chat: string;
  content: string | undefined;
  join: number;
  max: number;
  roomId: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    url: string;
  };
}
interface IPersonalChatList {
  chat: string;
  content: string;
  roomId: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    url: string;
  };
}

export default function makeList(chatList: IChatList) {
  const sections: any = [];

  chatList[0]?.map((el: IGroupChatList) => {
    sections.push(el);
  });
  chatList[1]?.map((el: IPersonalChatList) => {
    sections.push(el);
  });

  const temp = sections.filter(
    (ele: { updatedAt: string }) => ele.updatedAt !== '',
  );
  const empty = sections.filter(
    (ele: { updatedAt: string }) => ele.updatedAt === '',
  );
  temp.sort(function (a: { updatedAt: string }, b: { updatedAt: string }) {
    return +new Date(b.updatedAt) - +new Date(a.updatedAt);
  });

  return empty.concat(temp);
}
