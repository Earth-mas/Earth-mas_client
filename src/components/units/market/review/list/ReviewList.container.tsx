import * as S from './ReviewList.styles';
import axios from 'axios';
import store from 'storejs';
import { getAvg, getAvgStar } from 'commons/utils/getStars';
import OutlinedButton02 from 'components/commons/button/outlined/OutlinedButton02';
import Modal from 'components/commons/modal';
import ContentModal from 'components/commons/modal/contentModal/contentModal';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { marketReviewRoute } from 'utils/APIRoutes';
import { v4 as uuid4 } from 'uuid';
import ReviewDetail from '../detail/ReviewDetail';
import { IMarketReviewDetail } from '../detail/ReviewDetail.types';
import ReviewNew from '../new/ReviewNew.container';
import { IMarketDetail } from '../../detail/MarketDetail.types';
import { IMarketReviewListProps, IReview } from './ReviewList.types';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';
import InfoModal from 'components/commons/modal/infoModal/infoModal';

export default function ReviewList(props: IMarketReviewListProps) {
  const accessToken = store.get('accessToken');
  const [getBought, setGetBought] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { id } = useParams();
  const userInfo = useRecoilValue(userState);
  const [reviewId, setReviewId] = useState<string | null>(null);

  const toggleEditModal = () => {
    setIsNewOpen(prev => !prev);
  };

  const toggleModal = () => {
    setIsModal(prev => !prev);
  };

  const { data: reviewsData, refetch } = useQuery(
    ['getReviews'],
    async () => {
      const result = await axios.post(`${marketReviewRoute}/findall`, {
        market: id,
      });
      return result.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const findReview = (reviews: IReview[]) => {
    setReviewId(null);
    for (let i = 0; i < reviews.length; i++) {
      if (userInfo.id === reviews[i].user.id) {
        setReviewId(reviews[i].id);
        break;
      }
    }
    toggleEditModal();
  };

  const findBought = (ItemsBought: IMarketDetail[]) => {
    if (ItemsBought.length === 0) {
      toggleModal();
      return;
    }

    for (let i = 0; i < ItemsBought.length; i++) {
      if (props.detailData?.id === ItemsBought[i].id) {
        findReview(reviewsData);
        setGetBought(prev => !prev);
        return;
      }
      if (i === ItemsBought.length - 1) {
        toggleModal();
        return;
      }
    }
  };

  const { data: boughtData } = useQuery(
    ['getItemsBought'],
    async () => {
      return await axios.post(
        `https://earth-mas.shop/server/mypage/boughtmarket`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    },
    {
      enabled: getBought,
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findBought(res.data);
      },
    },
  );

  const marketData = {
    id: props.detailData?.id,
    title: props.detailData?.title,
    minidescription: props.detailData?.minidescription,
    url: props.detailData?.url,
  };

  return (
    <>
      {isNewOpen && (
        <Modal>
          <ContentModal
            onClickCancel={toggleEditModal}
            children={
              <ReviewNew
                onClickCancel={toggleEditModal}
                marketData={marketData}
                toggleEditModal={toggleEditModal}
                reviewId={reviewId}
                refetch={refetch}
              />
            }
          />
        </Modal>
      )}

      {isModal && (
        <Modal>
          <InfoModal
            contents="해당 상품을 구매하신 분만 리뷰 작성 가능합니다."
            okMessage="확인"
            onClickOk={toggleModal}
            title="알림"
          />
        </Modal>
      )}
      <S.Wrap>
        <S.Score>
          <p className="title">후기 총 평점</p>
          <ViewStars
            contained={
              props.detailData &&
              getAvgStar(
                props.detailData.reviewscore,
                props.detailData.reviewpeople,
              )
            }
            color="sub2"
          />
          <p className="score">
            {getAvg(
              props.detailData?.reviewscore,
              props.detailData?.reviewpeople,
            )}
          </p>

          <div className="button">
            <OutlinedButton02
              color="main"
              size="small"
              content="리뷰 작성"
              onClick={() => {
                setGetBought(prev => !prev);
              }}
            />
          </div>
        </S.Score>
        {reviewsData &&
          reviewsData.map((el: IMarketReviewDetail) => (
            <Fragment key={uuid4()}>
              <ReviewDetail reviewsData={el} refetch={refetch} />
            </Fragment>
          ))}
      </S.Wrap>
    </>
  );
}
