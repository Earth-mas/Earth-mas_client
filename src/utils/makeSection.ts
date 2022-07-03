import dayjs from 'dayjs';

export interface IDM {
  content: string;
  createdAt: Date;
  name: string;
  roomid: string;
  userid: string;
}

export default function makeSection(chatList: any) {
  const sections: any = {};

  chatList?.pages
    ?.flat()
    .reverse()
    .map((el: any) => {
      el?.posts?.forEach((chat: any) => {
        const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');

        if (Array.isArray(sections[monthDate])) {
          sections[monthDate].push(chat);
        } else {
          sections[monthDate] = [chat];
        }
      });
    });

  return sections;
}

//
