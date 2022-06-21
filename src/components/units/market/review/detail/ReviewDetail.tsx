import styled from '@emotion/styled';
import { Avatar } from 'assets/svgs';
import axios from 'axios';
import { GetDate } from 'commons/utils/GetDate';
import Dropdown03 from 'components/commons/dropdown/03/Dropdown03';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';

import { useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
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

  const onClickDeleteReview = async () => {
    alert('리뷰 삭제');
  };

  return (
    <Wrap>
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
          <span className="review-date">
            {GetDate(props.reviewData?.createAt)}
          </span>
        </div>
        <p className="review-content">{props.reviewData?.contents}</p>
      </div>
      {/* <div className="button"></div> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  padding: 30px 15px;
  display: flex;
  grid-gap: 20px;
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.SMALL};
  color: ${Colors.B60};
  border-bottom: 1px solid ${Colors.B40};

  .user {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      width: 30px;
      height: 30px;
      margin-bottom: 5px;
    }
    p {
    }
  }

  .review {
    width: calc(100% - 150px);
    .review-info {
      display: flex;
      .review-date {
        margin-left: 5px;
      }
    }

    .review-content {
      font-family: ${FontFamily.MEDIUM};
      font-size: ${FontSize.SMALL};
      color: ${Colors.B100};
      margin-top: 8px;
    }
  }
  .button {
    width: 50px;
    background-color: aqua;
  }
`;
