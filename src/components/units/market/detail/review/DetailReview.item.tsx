import styled from '@emotion/styled';
import { Avatar } from 'assets/svgs';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export default function DetailReviewItem() {
  return (
    <Wrap>
      <div className="user">
        <Avatar />
        <p>user-name</p>
      </div>
      <div className="review">
        <div>
          <span>*****</span>
          <span className="review-date">2022.05.27</span>
        </div>
        <p className="review-content">
          내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아내용입니다아아아아
        </p>
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
    .review-date {
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
