import styled from '@emotion/styled';
import { Avatar } from 'assets/svgs';
import { GetDate } from 'commons/utils/GetDate';
import Stars from 'components/commons/stars';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { IMarketDetailReview } from '../MarketDetail.types';

interface IDetailReviewItem {
  reviewData: IMarketDetailReview;
}

export default function DetailReviewItem(props: IDetailReviewItem) {
  console.log(props.reviewData);
  return (
    <Wrap>
      <div className="user">
        <Avatar />
        <p>user-name</p>
      </div>
      <div className="review">
        <div className="review-info">
          <span>
            <Stars
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
      <div className="button">버튼영역</div>
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
