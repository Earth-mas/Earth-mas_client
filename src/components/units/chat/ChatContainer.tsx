import axios from 'axios';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  MutableRefObject,
  Fragment,
} from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { chat } from 'utils/APIRoutes';
import { ChatInput } from './ChatInput';
import { IChatContainerProps } from './Chat.types';
import { ContainerWrapper, Scrollbar, StickyHeader } from './Chat.styles';
import { getDate } from 'commons/utils/utils';
import makeSection from 'utils/makeSection';
import { MessageList } from './MessageList';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuidv4 } from 'uuid';

export const ChatContainer = (props: IChatContainerProps) => {
  const userInfo = useRecoilValue(userState);

  const [messages, setMessages] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchChatList = async (pageParam: number) => {
    const roomId = props.chatUserList?.data[Number(props.roomid)]?.[0].id;
    const res = await axios.get(`${chat}/getchat/${roomId}/${pageParam}`);

    return {
      posts: res.data[2],
      length: res.data[1],
      isLast: res.data[0],
      nextPage: pageParam + 1,
    };
  };

  const { data, refetch, fetchNextPage } = useInfiniteQuery(
    'getChat',
    ({ pageParam = 1 }) => fetchChatList(pageParam),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    },
  );

  // console.log(data);

  const chatSection = makeSection(data?.pages[0].posts !== 0 ? data : []);

  useEffect(() => {
    // console.log(data);

    refetch();
    setLastPage(Math.ceil(data?.pages[0].length / 15));
    setMessages(chatSection);
  }, [props.currentChat, data]);

  // 보내는 메시지
  const handleSendMsg = (msg: any) => {
    console.log(msg);

    props.socketRef.current.emit('user-send', {
      userid: userInfo.id,
      name: userInfo.name,
      content: msg,
      roomid: props.chatUserList?.data[Number(props.roomid)]?.[0].id,
    });
  };

  // 스크롤바
  const scrollbarRef = useRef<any>(null);

  useEffect(() => {
    props.socketRef?.current?.on('user-send-emit', (msg: any) => {
      setArrivalMessage(msg);
      // console.log(msg);
    }); // 작성한 메시지를 수신

    // scrollbarRef.current?.scrollIntoView();
  }, [messages]); // 메시지에 변경사항이 있을 때마다 실행

  useEffect(() => {
    messages?.length > 1 &&
      arrivalMessage &&
      setMessages((prev: any) => [...prev, arrivalMessage]);

    refetch();
  }, [arrivalMessage]); // arrivalMessage와 이전 메시지를 배열에 담아줌

  const isEmpty = data?.pages[0]?.posts === 0;
  const isReachingEnd =
    isEmpty || (data && data?.pages[page - 1]?.posts.length < 15) || false;

  const onScroll = useCallback(
    (values: any) => {
      // console.log(values.scrollTop);
      // console.log(props.scrollRef);
      // console.log(props.scrollRef);
      // console.log(props.scrollRef?.current?.viewScrollTop());

      console.log(props.scrollRef);

      if (values.scrollTop === 0 && !isReachingEnd) {
        console.log('가장 위');

        console.log(values);
        console.log(values.scrollTop);

        if (!data?.pages[page - 1]?.isLast) {
          setPage(prev => prev + 1);
        }
        fetchNextPage().then(() => {
          const current = (props.scrollRef as MutableRefObject<Scrollbars>)
            ?.current;
          if (current) {
            // current.scrollTop(current.getScrollHeight() - values.clientHeight);
            // current.scrollTop(current.getScrollHeight() - values.scrollTop);
            current.scrollTop(values.scrollHeight - values.clientHeight);

            console.log(
              current.scrollTop(values.scrollHeight - values.clientHeight),
            );
            console.log(current);

            console.log(current.scrollTop(values.scrollHeight));
            console.log(current.scrollTop(values.clientHeight));
            console.log(current.getScrollHeight() - values.scrollHeight);
            // console.log(current.getScrollHeight() - values.scrollHeight);
            console.log(current.getScrollHeight());
            console.log(current.getScrollHeight() - values.clientHeight);
            console.log(values.clientHeight); // 520
            console.log(values.scrollTop); // 0
            console.log(
              values.scrollHeight - (values.clientHeight - values.clientHeight),
            );
            // console.log(values);
          }
        });
      }
    },
    [page, isReachingEnd, props.scrollRef, lastPage, fetchNextPage],
  );
  // console.log(props.scrollRef);
  // console.log(messages);

  return (
    <>
      {props.currentChat && (
        <ContainerWrapper>
          <Scrollbar autoHide ref={props.scrollRef} onScrollFrame={onScroll}>
            {Object.entries(messages).map((dataList: any) => {
              return (
                <Fragment key={uuidv4()}>
                  <StickyHeader>
                    <div>{getDate(dataList[0])}</div>
                  </StickyHeader>

                  {dataList[1]?.map((message: any) => (
                    <MessageList
                      key={uuidv4()}
                      scrollbarRef={scrollbarRef}
                      message={message}
                      clickUserId={props.clickUserId}
                    />
                  ))}
                </Fragment>
              );
            })}
          </Scrollbar>
          <ChatInput handleSendMsg={handleSendMsg} />
        </ContainerWrapper>
      )}
    </>
  );
};
