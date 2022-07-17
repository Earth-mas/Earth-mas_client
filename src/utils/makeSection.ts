import dayjs from 'dayjs';

export default function makeSection(chatList: any) {
  const sections: any = {};

  chatList?.pages
    ?.flat()
    .reverse()
    .map((el: { posts: any[] }) => {
      el?.posts?.forEach(chat => {
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
