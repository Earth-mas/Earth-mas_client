import styled from '@emotion/styled';
import axios from 'axios';
import { getAvg, getAvgStar } from 'commons/utils/getStars';
import ViewStars from 'components/commons/stars/viewStars/ViewStars';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { v4 as uuid4 } from 'uuid';
import ReviewDetail from '../detail/ReviewDetail';

interface IMarketReviewListProps {
  reviewscore?: number;
  reviewpeople?: number;
}
export default function ReviewList(props: IMarketReviewListProps) {
  const params = useParams();
  const [reviewData, setReviewData] = useState([]);

  const getReviews = async () => {
    await axios
      .post(`https://earth-mas.shop/server/marketreview/findall`, {
        market: String(params.id),
      })
      .then(res => {
        console.log(res);
        setReviewData(res.data);
        // console.log(reviewData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Wrap>
      <Score>
        <p className="title">후기 총 평점</p>
        <ViewStars
          contained={
            props.reviewscore &&
            getAvgStar(props.reviewscore, props.reviewpeople)
          }
          color="sub2"
        />
        <p className="score">{getAvg(props.reviewscore, props.reviewpeople)}</p>
      </Score>
      {reviewData &&
        reviewData.map(el => <ReviewDetail reviewData={el} key={uuid4()} />)}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
`;

const Score = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  grid-gap: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${Colors.B40};
  .title {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.MEDIUM_C};
    color: black;
  }
  .score {
    font-family: ${FontFamily.SEMIBOLD};
    font-size: ${FontSize.MEDIUM_T};
    color: black;
  }
`;
