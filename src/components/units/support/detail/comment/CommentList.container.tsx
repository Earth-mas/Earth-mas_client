import { useRef, useState } from 'react';
import { supportCommentRoute } from 'utils/APIRoutes';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CommentListUI from './CommentList.presenter';
import axiosApiInstance from 'commons/utils/axiosInstance';

export default function CommentList() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [comments, setComments] = useState('');
  const [clickPage, setClickPage] = useState(1);

  const inputRef = useRef<any>(null);

  const {
    data,
    refetch: getAllComment,
    isPreviousData,
  } = useQuery(
    ['allComment', clickPage],
    async () => {
      return await axiosApiInstance.post(`${supportCommentRoute}/findall`, {
        id: id,
        page: clickPage,
      });
    },
    { keepPreviousData: true },
  );

  const { mutate } = useMutation(
    () => {
      return axiosApiInstance.post(supportCommentRoute, {
        comments,
        donation: id,
      });
    },
    {
      onSuccess: () => {
        inputRef.current.value = '';
        queryClient.invalidateQueries('allComment', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const handleValidation = () => {
    if (comments === '') {
      alert('내용없음');
      return false;
    } else {
      mutate();
      return true;
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setComments(e.target.value);
  };

  const getAllCommentData = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        getAllComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <CommentListUI
      getAllCommentData={getAllCommentData}
      handleChange={handleChange}
      data={data}
      clickPage={clickPage}
      setClickPage={setClickPage}
      refetch={getAllComment}
      inputRef={inputRef}
      isPreviousData={isPreviousData}
    />
  );
}
