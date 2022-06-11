import { useState } from 'react';
import {
  Next,
  NextArrow,
  PageNumber,
  Prev,
  PrevArrow,
  Wrapper,
} from './Pagination.styles';

export default function Pagination() {
  const [clickPage, setClickPage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const lastPage = 1000;

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(prev => prev - 10);
    setClickPage(startPage - 10);
  };

  const onClickNextPage = () => {
    if (startPage + 10 > lastPage) return;
    setStartPage(prev => prev + 10);
    setClickPage(startPage + 10);
  };

  return (
    <Wrapper>
      <Prev startPage={startPage} onClick={onClickPrevPage}>
        <PrevArrow />
      </Prev>

      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= lastPage && (
            <PageNumber
              key={index + startPage}
              // onClick={onClickPage}
              id={String(index + startPage)}
              clickPage={clickPage}
            >
              {` ${index + startPage} `}
            </PageNumber>
          ),
      )}

      <Next startPage={startPage} lastPage={lastPage} onClick={onClickNextPage}>
        <NextArrow />
      </Next>
    </Wrapper>
  );
}
