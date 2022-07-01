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
import { IReview } from './ReviewList.types';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/user';

interface IMarketReviewListProps {
  detailData?: IMarketDetail;
}
export default function ReviewList(props: IMarketReviewListProps) {
  const accessToken = store.get('accessToken');
  const [getBought, setGetBought] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { id } = useParams();
  const userInfo = useRecoilValue(userState);
  const [reviewId, setReviewId] = useState<string | null>(null);

  const toggleEditModal = () => {
    setIsEditOpen(prev => !prev);
  };

  const { data: reviewsData, refetch } = useQuery(['getReviews'], async () => {
    const result = await axios.post(`${marketReviewRoute}/findall`, {
      market: id,
    });
    console.log(result.data);
    return result.data;
  });

  const findReview = (reviews: IReview[]) => {
    setReviewId(null);
    for (let i = 0; i < reviews.length; i++) {
      if (userInfo.id === reviews[i].user.id) {
        setReviewId(reviews[i].id);
        // toggleEditModal();
        break;
      }
    }
    toggleEditModal();
  };

  const findBought = (ItemsBought: IMarketDetail[]) => {
    if (ItemsBought.length === 0)
      return alert('해당 상품을 구매하신 분만 리뷰 작성가능합니다');
    for (let i = 0; i < ItemsBought.length; i++) {
      if (props.detailData?.id === ItemsBought[i].id) {
        findReview(reviewsData);
        setGetBought(prev => !prev);
        return;
      }
      if (i === ItemsBought.length - 1) {
        return alert('해당 상품을 구매하신 분만 리뷰 작성가능합니다');
      }
    }
  };

  const { data: boughtData } = useQuery(
    ['getItemsBought'],
    async () => {
      const temp = {
        param: null,
      };
      const result = await axios.post(
        `https://earth-mas.shop/server/mypage/boughtmarket`,
        temp,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return result.data;
    },
    {
      enabled: getBought,
      refetchOnWindowFocus: false,
      onSuccess: res => {
        findBought(res);
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
    <S.Wrap>
      {isEditOpen && (
        <Modal>
          <ContentModal
            onClickCancel={toggleEditModal}
            children={
              <ReviewNew
                onClickCancel={toggleEditModal}
                marketData={marketData}
                toggleEditModal={toggleEditModal}
                reviewId={reviewId}
              />
            }
          />
        </Modal>
      )}
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
  );
}
