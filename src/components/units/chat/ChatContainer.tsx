import axios from 'axios';
import {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  MutableRefObject,
  Fragment,
} from 'react';
import { useInfiniteQuery } from 'react-query';
import { chat } from 'utils/APIRoutes';
import { IChatContainerProps, IDataList, IMessage } from './Chat.types';
import { Scrollbar, StickyHeader } from './Chat.styles';
import { getDate } from 'commons/utils/utils';
import makeSection from 'utils/makeSection';
import { MessageList } from './MessageList';
import { Scrollbars } from 'react-custom-scrollbars';
import { v4 as uuidv4 } from 'uuid';

export const ChatContainer = forwardRef<Scrollbars, IChatContainerProps>(
  (props, ref) => {
    const [messages, setMessages] = useState<any>([]);
    const [arrivalMessage, setArrivalMessage] = useState({});
    const [lastPage, setLastPage] = useState(1);

    const personalChatList = async (pageParam: number) => {
      const res = await axios.get(
        `${chat}/getchat/${props.roomId}/${pageParam}`,
      );

      return {
        posts: res.data[2],
        length: res.data[1],
        isLast: res.data[0],
        nextPage: pageParam + 1,
      };
    };
    const {
      data: personalChat,
      refetch: personalChatRefetch,
      fetchNextPage: personalChatNextPage,
    } = useInfiniteQuery(
      'getChat',
      ({ pageParam = 1 }) => personalChatList(pageParam),
      {
        getNextPageParam: lastPage =>
          !lastPage.isLast ? lastPage.nextPage : undefined,
      },
    );

    const groupChatList = async (pageParam: number) => {
      const res = await axios.get(
        `${chat}/get-activitychat/${props.roomId}/${pageParam}`,
      );

      return {
        posts: res.data[2],
        length: res.data[1],
        isLast: res.data[0],
        nextPage: pageParam + 1,
      };
    };
    const {
      data: groupChat,
      refetch: groupChatRefetch,
      fetchNextPage: groupChatNextPage,
    } = useInfiniteQuery(
      'getActivityChat',
      ({ pageParam = 1 }) => groupChatList(pageParam),
      {
        getNextPageParam: lastPage =>
          !lastPage.isLast ? lastPage.nextPage : undefined,
      },
    );

    const chatSection = makeSection(
      props.currentChat?.chat === 'personalChat'
        ? personalChat?.pages[0].posts !== 0
          ? personalChat
          : []
        : groupChat?.pages[0].posts !== 0
        ? groupChat
        : [],
    );

    const data =
      props.currentChat?.chat === 'personalChat' ? personalChat : groupChat;

    useEffect(() => {
      props.currentChat?.chat === 'personalChat'
        ? personalChatRefetch()
        : groupChatRefetch();
      setLastPage(Math.ceil(data?.pages[0].length / 15));
      setMessages(chatSection);
    }, [props.currentChat, data]);

    useEffect(() => {
      props.currentChat?.chat === 'personalChat'
        ? props.socketRef?.current?.on('user-send-emit', (msg: string) => {
            setArrivalMessage(msg);
          })
        : props.socketRef?.current?.on('room-send-emit', (msg: string) => {
            setArrivalMessage(msg);
          }); // 작성한 메시지를 수신
    }, [messages]); // 메시지에 변경사항이 있을 때마다 실행

    useEffect(() => {
      messages?.length > 1 &&
        arrivalMessage &&
        setMessages((prev: [IMessage]) => [...prev, arrivalMessage]);

      props.currentChat?.chat === 'personalChat'
        ? personalChatRefetch()
        : groupChatRefetch();
    }, [arrivalMessage]); // arrivalMessage와 이전 메시지를 배열에 담아줌

    const isEmpty = data?.pages[0]?.posts === 0;
    const isReachingEnd =
      isEmpty ||
      (data && data?.pages[lastPage - 1]?.posts?.length < 15) ||
      false;

    const onScroll = useCallback(
      (values: { scrollTop: number; clientHeight: number }) => {
        if (values.scrollTop === 0 && !isReachingEnd) {
          props.currentChat?.chat === 'personalChat'
            ? personalChatNextPage().then(() => {
                const current = (ref as MutableRefObject<Scrollbars>)?.current;
                if (current) {
                  current.scrollTop(
                    current.getScrollHeight() - values.clientHeight,
                  );
                }
              })
            : groupChatNextPage().then(() => {
                const current = (ref as MutableRefObject<Scrollbars>)?.current;
                current.scrollTop(
                  current.getScrollHeight() - values.clientHeight,
                );
              });
        }
      },
      [isReachingEnd, ref, lastPage, personalChatNextPage, groupChatRefetch],
    );

    return (
      <>
        {props.currentChat && (
          <Scrollbar autoHide ref={ref} onScrollFrame={onScroll}>
            {Object.entries(messages).map((dataList: any) => {
              return (
                <Fragment key={uuidv4()}>
                  <StickyHeader>
                    <div>{getDate(dataList[0])}</div>
                  </StickyHeader>

                  {dataList[1]?.map((message: IDataList) => (
                    <MessageList key={uuidv4()} message={message} />
                  ))}
                </Fragment>
              );
            })}
          </Scrollbar>
        )}
      </>
    );
  },
);
