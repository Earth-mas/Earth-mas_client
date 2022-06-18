import axios from 'axios';
import { useState } from 'react';
import { supportCommentRoute } from 'utils/APIRoutes';
import store from 'storejs';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import CommentListUI from './CommentList.presenter';

export default function CommentList() {
  const { id } = useParams();
  const accessToken = store.get('accessToken');

  const [value, setValue] = useState({
    comments: '',
    donation: id,
  });

  const { mutate: postComment } = useMutation(async () => {
    const { comments } = value;
    return await axios.post(
      supportCommentRoute,
      {
        comments,
        donation: id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  });

  const { data, refetch: getAllComment } = useQuery('allComment', async () => {
    return await axios.post(`${supportCommentRoute}/findall`, { id: id });
  });

  const getAllgetAllCommentData = (e: any) => {
    e.preventDefault();
    try {
      postComment();
      getAllComment();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <CommentListUI
      getAllgetAllCommentData={getAllgetAllCommentData}
      handleChange={handleChange}
      data={data}
    />
  );
}
