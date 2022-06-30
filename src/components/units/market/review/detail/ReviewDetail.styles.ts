import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  width: 100%;
  padding: 30px 15px;
  display: flex;
  grid-gap: 20px;
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.SMALL};
  color: ${Colors.B60};
  border-bottom: 1px solid ${Colors.B40};

  .user {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 5px;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    p {
    }
  }

  .review {
    width: calc(100% - 120px);
    > div:nth-of-type(1) {
      display: flex;
      margin-bottom: 5px;
      .review-date {
        margin-left: 10px;
      }
    }
    .review-image {
      ul {
        display: flex;
        li {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .review-content {
      font-family: ${FontFamily.MEDIUM};
      font-size: ${FontSize.SMALL};
      color: ${Colors.B100};
      margin-top: 8px;
    }
  }
`;
