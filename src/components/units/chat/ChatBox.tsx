import { StickyHeader } from './Chat.styles';
import { getDate } from 'commons/utils/utils';
import { MessageList } from './MessageList';
import { v4 as uuidv4 } from 'uuid';

export const ChatBox = (dataList: any) => {
  console.log(dataList);

  return (
    <>
      <StickyHeader>
        <div>{getDate(dataList.dataList[0])}</div>
      </StickyHeader>

      {dataList.dataList[1]?.map((message: any) => (
        <MessageList key={uuidv4()} message={message} />
      ))}
    </>
  );
};
