import { CommentWrapper } from './Comment.styles';
import Comment from './Comment';
import { ICommentListUIProps } from './Comment.types';
import { BubbleIcon } from 'assets/svgs';
import { Sub1 } from '../SupportDetail.styles';
import { v4 as uuidv4 } from 'uuid';
import Pagination from 'components/commons/pagination';
import Input03 from 'components/commons/inputs/Input03';

export default function CommentListUI(props: ICommentListUIProps) {
  return (
    <>
      <div className="commentTitle">
        <span>댓글</span>
        <Sub1>{props.data?.data?.length}</Sub1>
        <BubbleIcon />
      </div>

      <CommentWrapper>
        <div className="userImg">
          <img
            src="/images/profileDefault.png"
            onError={e => {
              e.currentTarget.src = '/images/profileDefault.png';
            }}
          />
        </div>

        <form className="commentInput" onSubmit={props.getAllCommentData}>
          <Input03
            type="text"
            placeholder="댓글을 남겨보세요"
            name="comments"
            inputRef={props.inputRef}
            onChange={e => props.handleChange(e)}
          />
          <button>입력</button>
        </form>
      </CommentWrapper>

      {props.data?.data?.arr?.map((el: any) => (
        <Comment key={uuidv4()} el={el} />
      ))}
      {props.data?.data?.length >= 1 && (
        <Pagination
          page="comment"
          refetch={props.refetch}
          listCount={props.data?.data?.length}
          clickPage={props.clickPage}
          setClickPage={props.setClickPage}
          startPage={props.startPage}
          setStartPage={props.setStartPage}
        />
      )}
    </>
  );
}
