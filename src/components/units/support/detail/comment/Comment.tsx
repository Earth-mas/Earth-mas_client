import { DateToString } from 'commons/utils/utils';
import Input01 from 'components/commons/inputs/Input01';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { supportCommentRoute } from 'utils/APIRoutes';
import { CommentInputWrapper, Mine, Wrapper } from './Comment.styles';
import { ICommentProps } from './Comment.types';
import { useParams } from 'react-router-dom';
import axiosApiInstance from 'commons/utils/axiosInstance';
interface IAnswerInput {
  comments?: string;
}

export default function Comment(props: ICommentProps) {
  const { id } = useParams();

  const userInfo = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const [comments, setComments] = useState('');

  const { mutate: deleteComment } = useMutation(
    'commentDelete',
    async () => {
      return await axiosApiInstance.delete(
        `${supportCommentRoute}/${props.el.id}`,
      );
    },
    {
      onSuccess: res => {
        console.log(res);

        queryClient.invalidateQueries('allComment', { refetchInactive: true });
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const onClickDelete = () => {
    deleteComment();
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
        queryClient.invalidateQueries('allComment', { refetchInactive: true });

        setIsEdit(false);
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
    if (!comments) return false;

    const VariablesAnswer: IAnswerInput = {};
    if (comments) VariablesAnswer.comments = comments;

    try {
      setIsEdit(prev => !prev);
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const onClickEditInput = () => {
    setIsEdit(prev => !prev);
  };

  return (
    <Wrapper>
      <div className="userImg">
        <img
          src={props.el?.user?.url}
          onError={e => {
            e.currentTarget.src = '/images/profileDefault.png';
          }}
        />
      </div>
      <div className="userContent">
        <div className="userName">
          <span>{props.el?.user?.name}</span>
          {props.el?.user?.id === userInfo.id ? <Mine>내 댓글</Mine> : ''}
        </div>
        {isEdit ? (
          <CommentInputWrapper>
            <form className="commentInput" onSubmit={onClickEditComment}>
              <Input01
                type="text"
                placeholder="댓글을 남겨보세요"
                name="comments"
                onChange={e => handleChange(e)}
                defaultValue={props.el?.comments}
              />
              <button>입력</button>
            </form>
          </CommentInputWrapper>
        ) : (
          <>
            <p>{props.el?.comments}</p>
            <div className="contentButton">
              <span>{DateToString(props.el?.updatedAt)}</span>
              {props.el?.user?.id === userInfo.id && (
                <>
                  • <button onClick={onClickEditInput}>수정</button>
                </>
              )}
              {props.el?.user?.id === userInfo.id && (
                <>
                  • <button onClick={onClickDelete}>삭제</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
