import { Avatar } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import * as S from './ReviewDetail.styles';
import { v4 as uuid4 } from 'uuid';

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
        <p>{props.reviewData?.user?.name}</p>
      </div>
      <div className="review" onClick={getReview}>
        <div>
          <ViewStars
            color="sub2"
            contained={
              props.reviewData?.score && (props.reviewData?.score / 5) * 100
            }
          />
          <span className="review-date">
            {GetDate(props.reviewData?.createAt)}
          </span>
        </div>
        <div className="review-image">
          <ul>
            {props.reviewData?.url.split(',').map(el => (
              <li key={uuid4()}>
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
