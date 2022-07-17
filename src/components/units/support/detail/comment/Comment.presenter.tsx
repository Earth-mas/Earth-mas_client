import { DateToString } from 'commons/utils/utils';
import Input01 from 'components/commons/inputs/Input01';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { CommentInputWrapper, Mine, Wrapper } from './Comment.styles';
import { ICommentUIProps } from './Comment.types';

export default function CommentUI(props: ICommentUIProps) {
  const userInfo = useRecoilValue(userState);

  return (
    <>
      {props.modal && (
        <Modal>
          <AlertModal
            title="💬 정말 삭제하시겠어요?"
            contents="해당 댓글이 삭제되며, 복구할 수 없습니다."
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={props.onClickOpenModal}
            onClickOk={props.onClickDelete}
          />
        </Modal>
      )}
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
          {props.isEdit ? (
            <CommentInputWrapper>
              <form
                className="commentInput"
                onSubmit={props.onClickEditComment}
              >
                <Input01
                  type="text"
                  placeholder="댓글을 남겨보세요"
                  name="comments"
                  onChange={e => props.handleChange(e)}
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
                    • <button onClick={props.onClickEditInput}>수정</button>
                  </>
                )}
                {props.el?.user?.id === userInfo.id && (
                  <>
                    • <button onClick={props.onClickOpenModal}>삭제</button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
}
