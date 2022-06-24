import { useEffect } from 'react';
import {
  Next,
  NextArrow,
  PageNumber,
  Prev,
  PrevArrow,
  Wrapper,
} from './Pagination.styles';
import { IPaginationProps } from './Pagination.type';

// page: 'list' | 'comment'
export default function Pagination(props: IPaginationProps) {
  const startPage = props.startPage;
  const setStartPage = props.setStartPage;
  const clickPage = props.clickPage;
  const setClickPage = props.setClickPage;

  const lastPage = () => {
    if (props.page === 'list') return Math.ceil(props.listCount / 12);
    else if (props.page === 'comment') return Math.ceil(props.listCount / 10);
  };

  const onClickPage = (event: { currentTarget: { id: any } }) => {
    setClickPage(Number(event.currentTarget.id));
    props.refetch(Number(event.currentTarget.id));
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(prev => prev - 10);
    setClickPage(startPage - 10);
    props.refetch(startPage - 10);
  };

  const onClickNextPage = () => {
    if (startPage + 10 > Number(lastPage())) return;
    setStartPage(prev => prev + 10);
    setClickPage(startPage + 10);
    props.refetch(startPage + 10);
  };

  return (
    <Wrapper>
      <Prev onClick={onClickPrevPage}>
        <PrevArrow />
      </Prev>

      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= Number(lastPage()) && (
            <PageNumber
              key={index + startPage}
              onClick={onClickPage}
              id={String(index + startPage)}
              clickPage={clickPage}
            >
              {` ${index + startPage} `}
            </PageNumber>
          ),
      )}

      <Next onClick={onClickNextPage}>
        <NextArrow />
      </Next>
    </Wrapper>
  );
}
