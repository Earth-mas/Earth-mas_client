import { CalenderIcon } from 'assets/svgs';
import { GetDate } from 'commons/utils/GetDate';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton03';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import Modal from 'components/commons/modal';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import Slide from 'components/commons/slide';
import DOMPurify from 'dompurify';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import { MainImg, PostBox, Wrap } from './ActivityDetail.styles';
import { IActivityDetailProps } from './ActivityDetail.types';

interface IActivityDetailUIProps {
  activityData?: IActivityDetailProps | undefined;
  isDeleteModal: boolean;
  isJoinModalOpen: boolean;
  deleteActivityData: () => void;
  toggleDeleteModal: () => void;
  toggleJoinModal: () => void;
  joinChat: () => void;
}

export default function ActivityDetailUI(props: IActivityDetailUIProps) {
  const userInfo = useRecoilValue(userState);
  return (
    <>
      {props.isDeleteModal && (
        <Modal>
          <AlertModal
            title="❗게시글을 삭제할 경우 해당 게시글에 대한 정보는 복구가 불가능합니다."
            contents="그래도 삭제하시겠습니까?"
            okMessage="삭제하기"
            cancelMessage="취소"
            onClickOk={props.deleteActivityData}
            onClickCancel={props.toggleDeleteModal}
          />
        </Modal>
      )}
      {props.isJoinModalOpen && (
        <Modal>
          <AlertModal
            title="해당 작성자와 1:1 채팅 또는 단체 채팅으로 참여할 수 있습니다."
            contents="참여하시겠습니까?"
            okMessage="참여하기"
            cancelMessage="취소"
            onClickOk={props.joinChat}
            onClickCancel={props.toggleJoinModal}
          />
        </Modal>
      )}
      <Wrap>
        <MainImg>
          <Slide banner={props.activityData?.url?.split(',')} slide={'sub'} />
        </MainImg>
        <Blank height={50} />
        <PostBox>
          <p className="title">{props.activityData?.title}</p>
          <Blank height={25} />
          <div className="postInfoBox">
            <div className="userInfo">
              <img
                src={props.activityData?.activityjoin[0].user?.url}
                onError={event =>
                  (event.currentTarget.src = '/images/avatar.svg')
                }
              />
              <span>
                {props.activityData?.activityjoin[0].user?.name
                  ? props.activityData.activityjoin[0].user?.name
                  : '에러지롱!'}
              </span>
            </div>
            <section className="detailInfo">
              <div>
                <CalenderIcon className="icon" />
                {GetDate(props.activityData?.createAt)}~
                {GetDate(props.activityData?.dday)}
              </div>
              <ul>
                <span>카테고리</span>
                <li>{props.activityData?.activitycategory?.category}</li>
                <span>지역</span>
                <li>{props.activityData?.location}</li>
                <span>모집인원</span>
                <li>{Number(props.activityData?.maxpeople)}명</li>
              </ul>
            </section>
            <section className="icon2">
              {userInfo.id ===
                props.activityData?.activityjoin[0]?.user?.id && (
                <Dropdown05
                  page={'activity'}
                  toggleDeleteModal={props.toggleDeleteModal}
                />
              )}
            </section>
          </div>
          <Blank height={25} />
          <div className="postContents">
            준비물 :{props.activityData?.subdescription}
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  String(props.activityData?.description),
                ),
              }}
            />
          </div>
        </PostBox>
        <div className="button" style={{ margin: 'auto' }}>
          <ContainedButton01
            content={'참여하기'}
            color={'main'}
            type="submit"
            onClick={props.toggleJoinModal}
          />
        </div>
        <Blank height={100} />
      </Wrap>
    </>
  );
}
