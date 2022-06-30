import { useEffect, useRef } from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<any>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;
