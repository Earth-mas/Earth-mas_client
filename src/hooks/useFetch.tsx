import { useState, useEffect, useCallback } from 'react';

const END_POINT = 'https://earth-mas.shop/server/chat/getchat';
const useFetch = (page: number) => {
  const [list, setList] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //로딩 구현 시에만 필요

  //query API 요청 보내기
  const sendQuery = useCallback(async () => {
    const URL = `${END_POINT}?${page}~~~`;

    try {
      setIsLoading(true);
      const response = await (await fetch(URL)).json();
      if (!response) {
        throw new Error(`서버에 오류가 있습니다.`);
      }
      setList(response.data);
      setHasMore(response.length > 0);
      setIsLoading(false);
    } catch (e) {
      throw new Error(`오류입니다. ${e}`);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { hasMore, list, setList, isLoading };
};
export default useFetch;
/* // list. data 전에 있던 값 + 새로 가져온 query API 응답값을 더해 새로운 배열을 만들어 set
      setList((prev) => [...new Set([...prev, ...response])]);
//응답값이 있으면 set
      setHasMore(response.length > 0);
// data 불러오기 전 잠시 로딩중
    setIsLoading(true);
// 중략
    setIsLoading(false); */
