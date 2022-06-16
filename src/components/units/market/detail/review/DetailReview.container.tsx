import styled from '@emotion/styled';
import axios from 'axios';
import Stars from 'components/commons/stars';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import DetailReviewItem from './DetailReview.item';

interface IDetailReview {
  reviewscore?: number;
}
export default function DetailReview(props: IDetailReview) {
  const params = useParams();
  // const [reviewData, setReviewData] = useState();

  const getReviews = async () => {
    await axios
      .get(`https://earth-mas.shop/server/marketreview/${params.id}`)
      .then(res => {
        console.log(res);
        // setReviewData(res.data);
        // console.log(reviewData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReviews();
    console.log(params.id);
  }, []);
  return (
    <Wrap>
      <Score>
        <p className="title">후기 총 평점</p>
        <Stars
          contained={props.reviewscore && (props.reviewscore / 5) * 100}
          color="sub2"
        />
        <p className="score">{props.reviewscore}</p>
      </Score>

      <DetailReviewItem />
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
