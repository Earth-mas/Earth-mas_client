export default function makeList(chatList: any) {
  const sections: any = [];

  chatList[0]?.map((el: any) => {
    sections.push(el);
  });
  chatList[1]?.map((el: any) => {
    sections.push(el);
  });

  return sections.sort(function (a: any, b: any) {
    return -new Date(a.updatedAt) - -new Date(b.updatedAt);
  });
}
