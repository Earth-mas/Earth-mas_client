import axios from 'axios';
import { useState } from 'react';
import { supportCommentRoute } from 'utils/APIRoutes';
import store from 'storejs';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CommentListUI from './CommentList.presenter';

export default function CommentList() {
  const { id } = useParams();
  const accessToken = store.get('accessToken');
  const queryClient = useQueryClient();

  const [comments, setComments] = useState('');

  const { data, refetch: getAllComment } = useQuery('allComment', async () => {
    return await axios.post(`${supportCommentRoute}/findall`, {
      id: id,
      page: 1,
    });
  });

  const { mutate } = useMutation(
    () => {
      return axios.post(
        supportCommentRoute,
        { comments, donation: id },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
    },
    {
      onSuccess: () => {
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
        setComments('');
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
    />
  );
}
