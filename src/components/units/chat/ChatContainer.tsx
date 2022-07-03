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

export const ChatContainer = forwardRef<Scrollbars, IChatContainerProps>(
  (props, scrollRef) => {
    const userInfo = useRecoilValue(userState);

    const [messages, setMessages] = useState<any>([]);
    const [arrivalMessage, setArrivalMessage] = useState({});
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchChatList = async (pageParam: number) => {
      const roomId = props.chatUserList?.data[Number(props.roomid)]?.id;
      const res = await axios.get(`${chat}/getchat/${roomId}/${pageParam}`);
      // const { posts, isLast } = res.data;
      // return { posts, nextPage: pageParam + 1, isLast };
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

    const chatSection = makeSection(data?.pages[0].posts !== 0 ? data : []);

    useEffect(() => {
      refetch();

      setLastPage(Math.ceil(data?.pages[0].length / 15));
      setMessages(chatSection);
    }, [props.currentChat, data]);

    // 보내는 메시지
    const handleSendMsg = (msg: any) => {
      props.socketRef.current.emit('user-send', {
        userid: userInfo.id,
        name: userInfo.name,
        content: msg,
        roomid: props.chatUserList?.data[Number(props.roomid)]?.id,
      });
    };

    // 스크롤바
    // const scrollbarRef = useRef<any>(null);

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
      /* async */ (values: any) => {
        if (values.scrollTop === 0 && !isReachingEnd) {
          console.log('가장 위');

          if (!data?.pages[page - 1]?.isLast) {
            setPage(prev => prev + 1);
          }
          /* await */ fetchNextPage().then();
          const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          }
        }
      },
      [page, isReachingEnd, scrollRef, lastPage, fetchNextPage],
    );

    return (
      <>
        {props.currentChat && (
          <ContainerWrapper>
            <Scrollbar autoHide ref={scrollRef} onScrollFrame={onScroll}>
              {Object.entries(messages).map((dataList: any) => {
                return (
                  <Fragment key={uuidv4()}>
                    <StickyHeader>
                      <div>{getDate(dataList[0])}</div>
                    </StickyHeader>

                    {dataList[1]?.map((message: any) => (
                      <MessageList
                        key={uuidv4()}
                        // scrollbarRef={scrollbarRef}
                        message={message}
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
  },
);
