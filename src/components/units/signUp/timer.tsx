import useInterval from 'hooks/useInterval';
import { useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(Date.now());
  useInterval(() => {
    setSeconds(Date.now());
  }, 1000);
  return { seconds };
}
