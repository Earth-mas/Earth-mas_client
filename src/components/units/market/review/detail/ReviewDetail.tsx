import { Avatar } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import UserProfile from 'components/commons/profile/profile';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';

import * as S from './ReviewDetail.styles';

import { IMarketReviewDetail } from './ReviewDetail.types';
interface IReviewDetailProps {
  reviewData: IMarketReviewDetail;
}

export default function ReviewDetail(props: IReviewDetailProps) {
  // console.log(props.reviewData);

  const getReview = async () => {
    await axios
      .get(`https://earth-mas.shop/server/marketreview/${props.reviewData?.id}`)
      .then(res => {
        console.log(res);
        // console.log(reviewData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <S.Wrap>
      <div className="user">
        <Avatar />
        <p>{props.reviewData?.user?.email}</p>
      </div>
      <div className="review" onClick={getReview}>
        <div className="review-info">
          <span>
            <ViewStars
              color="sub2"
              contained={
                props.reviewData?.score && (props.reviewData?.score / 5) * 100
              }
            />
          </span>
          <p>{props.reviewData?.user?.email}</p>
          <span className="review-date">
            {GetDate(props.reviewData?.createAt)}
          </span>
        </div>
        <div className="review-image">
          <ul>
            {props.reviewData?.url.split(',').map(el => (
              <li>
                <img src={el} />
              </li>
            ))}
          </ul>
        </div>
        <p className="review-content">{props.reviewData?.contents}</p>
      </div>
    </S.Wrap>
  );
}
