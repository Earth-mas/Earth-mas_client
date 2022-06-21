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

  const [value, setValue] = useState({
    comments: '',
    donation: id,
  });

  const { mutate: postComment } = useMutation(
    async () => {
      const { comments } = value;
      return await axios.post(
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

  const { data, refetch: getAllComment } = useQuery('allComment', async () => {
    return await axios.post(`${supportCommentRoute}/findall`, { id: id });
  });

  const handleValidation = () => {
    const { comments } = value;

    if (comments === '') {
      alert('내용없음');
      return false;
    } else {
      setValue({ comments: '', donation: id });
      return true;
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const getAllgetAllCommentData = (e: any) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        postComment();
        getAllComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <CommentListUI
      getAllgetAllCommentData={getAllgetAllCommentData}
      handleChange={handleChange}
      data={data}
    />
  );
}
