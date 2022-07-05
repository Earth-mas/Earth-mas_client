import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import * as S from './ReviewDetail.styles';
import { v4 as uuid4 } from 'uuid';
import { IReviewDetailProps } from './ReviewDetail.types';
import Dropdown05 from 'components/commons/dropdown/05/Dropdown05';
import Modal from 'components/commons/modal';
import { useState } from 'react';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ReviewNew from '../new/ReviewNew.container';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import AlertModal from 'components/commons/modal/alertModal/alertModal';
import { useMutation } from 'react-query';
import { marketReviewRoute } from 'utils/APIRoutes';

export default function ReviewDetail(props: IReviewDetailProps) {
  const userInfo = useRecoilValue(userState);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleDeleteModal = () => {
    setIsDeleteOpen(prev => !prev);
  };

  const toggleEditModal = () => {
    setIsEditOpen(prev => !prev);
  };

  const marketData = {
    id: props.reviewsData.market.id,
    title: props.reviewsData.market.title,
    minidescription: props.reviewsData.market.minidescription,
    url: props.reviewsData.market.url,
  };

  const { mutate: deleteReview } = useMutation(
    async () => {
      return await axios.delete(`${marketReviewRoute}/${props.reviewsData.id}`);
    },
    {
      onSuccess: () => {
        setIsDeleteOpen(false);
        props.refetch();
      },
    },
  );

  return (
    <S.Wrap>
      {isDeleteOpen && (
        <Modal>
          <AlertModal
            title="💬 정말 삭제하시겠어요?"
            contents="해당 상품의 모든 정보가 삭제되며, 복구할 수 없습니다."
            okMessage="네, 삭제할게요"
            cancelMessage="아니오, 취소할게요"
            onClickCancel={toggleDeleteModal}
            onClickOk={deleteReview}
          />
        </Modal>
      )}
      {isEditOpen && (
        <Modal>
          <ContentModal
            onClickCancel={toggleEditModal}
            children={
              <ReviewNew
                onClickCancel={toggleEditModal}
                reviewId={props.reviewsData?.id}
                marketData={marketData}
                toggleEditModal={toggleEditModal}
                refetch={props.refetch}
              />
            }
          />
        </Modal>
      )}
      <div className="user">
        <div>
          <img src={props.reviewsData?.user.url} />
        </div>
        <p>{props.reviewsData?.user.name}</p>
      </div>
      <div className="review">
        <div>
          <ViewStars
            color="sub2"
            contained={
              props.reviewsData?.score && (props.reviewsData?.score / 5) * 100
            }
          />
          <span className="review-date">
            {GetDate(props.reviewsData?.createAt)}
          </span>
        </div>
        <div className="review-image">
          {props.reviewsData?.url !== '' && (
            <ul>
              {props.reviewsData?.url.split(',').map(el => (
                <li key={uuid4()}>
                  <img src={el} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="review-content">{props.reviewsData?.contents}</p>
      </div>
      {userInfo.id === props.reviewsData?.user.id && (
        <Dropdown05
          page="marketreview"
          toggleEditModal={toggleEditModal}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
    </S.Wrap>
  );
}
