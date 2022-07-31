import { useEffect, useState } from 'react';
import * as S from './Pagination.styles';
import { IPaginationProps } from './Pagination.type';

// page: 'list' | 'comment'
export default function Pagination(props: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);

  const clickPage = props.clickPage;
  const setClickPage = props.setClickPage;

  const lastPage = () => {
    if (props.page === 'list') return Math.ceil(props.listCount / 12);
    else if (props.page === 'comment') return Math.ceil(props.listCount / 10);
  };

  const onClickPage = (event: { currentTarget: { id: string } }) => {
    props.refetch(Number(event.currentTarget.id));
    setClickPage(Number(event.currentTarget.id));
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

  useEffect(() => {
    if (clickPage === 1) setStartPage(1);
  }, [clickPage]);

  return (
    <S.Wrapper>
      <S.Prev onClick={onClickPrevPage} startPage={startPage}>
        <S.PrevArrow />
      </S.Prev>

      {new Array(10).fill(1).map(
        (_, index) =>
          index + startPage <= Number(lastPage()) && (
            <S.PageNumber
              key={index + startPage}
              onClick={event => {
                onClickPage(event);
              }}
              id={String(index + startPage)}
              clickPage={clickPage}
            >
              {` ${index + startPage} `}
            </S.PageNumber>
          ),
      )}

      <S.Next
        onClick={onClickNextPage}
        startPage={startPage}
        lastPage={Number(lastPage())}
      >
        <S.NextArrow />
      </S.Next>
    </S.Wrapper>
  );
}
