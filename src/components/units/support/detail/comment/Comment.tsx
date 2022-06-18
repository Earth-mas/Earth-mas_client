import { DateToString } from 'commons/utils/utils';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { Mine, Wrapper } from './Comment.styles';
import { ICommentListProps } from './Comment.types';

export default function Comment(props: ICommentListProps) {
  const userInfo = useRecoilValue(userState);

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
          {props.el?.user?.id && userInfo.id && <Mine>내 댓글</Mine>}
        </div>
        <p>{props.el?.comments}</p>
        <div className="contentButton">
          <span>{DateToString(props.el?.updatedAt)}</span>
          {props.el?.user?.id && userInfo.id && (
            <>
              • <button>수정</button>
            </>
          )}
          {props.el?.user?.id && userInfo.id && (
            <>
              • <button>삭제</button>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
