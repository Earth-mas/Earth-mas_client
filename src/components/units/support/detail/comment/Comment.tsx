import axios from 'axios';
import { DateToString } from 'commons/utils/utils';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { supportCommentRoute } from 'utils/APIRoutes';
import { Mine, Wrapper } from './Comment.styles';
import { ICommentListProps } from './Comment.types';

export default function Comment(props: ICommentListProps) {
  const userInfo = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation(
    'commentDelete',
    async () => {
      return await axios.delete(`${supportCommentRoute}/${props.el.id}`);
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

  return (
    <Wrapper>
      <div className="userImg">
        <img
          src={props.el?.user.url}
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
        <p>{props.el?.comments}</p>
        <div className="contentButton">
          <span>{DateToString(props.el?.updatedAt)}</span>
          {props.el?.user?.id === userInfo.id ? (
            <>
              • <button>수정</button>
            </>
          ) : (
            ''
          )}
          {props.el?.user?.id === userInfo.id && (
            <>
              • <button onClick={onClickDelete}>삭제</button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
