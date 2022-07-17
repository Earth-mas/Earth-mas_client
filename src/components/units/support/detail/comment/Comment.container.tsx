import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { supportCommentRoute } from 'utils/APIRoutes';
import { ICommentProps } from './Comment.types';
import { useParams } from 'react-router-dom';
import axiosApiInstance from 'commons/utils/axiosInstance';
import CommentUI from './Comment.presenter';
interface IAnswerInput {
  comments?: string;
}

export default function Comment(props: ICommentProps) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [comments, setComments] = useState('');

  const { mutate: deleteComment } = useMutation(
    'commentDelete',
    async () => {
      return await axiosApiInstance.delete(
        `${supportCommentRoute}/${props.el.id}`,
      );
    },
    {
      onSuccess: () => {
        setModal(prev => !prev);
        alert('댓글이 삭제되었습니다');
        queryClient.invalidateQueries('allComment', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const onClickOpenModal = () => {
    setModal(prev => !prev);
  };

  const { mutate } = useMutation(
    () => {
      return axiosApiInstance.put(`${supportCommentRoute}/${props.el?.id}`, {
        comments,
        donation: id,
      });
    },
    {
      onSuccess: () => {
        setIsEdit(false);
        queryClient.invalidateQueries('allComment', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setComments(e.target.value);
  };

  const onClickEditComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!comments) {
      alert('수정사항이 없습니다');
      return false;
    }

    const VariablesAnswer: IAnswerInput = {};
    if (comments) VariablesAnswer.comments = comments;

    try {
      setIsEdit(prev => !prev);
      mutate();
      alert('댓글이 수정되었습니다');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEditInput = () => {
    setIsEdit(prev => !prev);
  };

  return (
    <CommentUI
      isEdit={isEdit}
      el={props.el}
      modal={modal}
      onClickOpenModal={onClickOpenModal}
      onClickDelete={deleteComment}
      handleChange={handleChange}
      onClickEditComment={onClickEditComment}
      onClickEditInput={onClickEditInput}
    />
  );
}
