import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  margin-top: 50px;
  .button {
    width: 20%;
  }
`;

export const MainImg = styled.div`
  width: 100%;
  height: 380px;
  border-radius: 5px;
`;

export const PostBox = styled.div`
  width: 100%;
  .title {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.LARGE_T};
  }

  .postInfoBox {
    height: 80px;
    border: 1px solid ${Colors.B60};
    border-radius: 8px;
    padding: 12px 20px;
    display: flex;

    & img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }

    .userInfo {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      width: 12%;
      margin-right: 20px;
    }

    .detailInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      ul {
        span {
          color: ${Colors.B60};
          margin-right: 5px;
        }
        li {
          display: inline;
          font-size: ${FontSize.MEDIUM_C};
          margin-right: 20px;
        }
      }
    }
  }

  .icon {
    margin-right: 5px;
  }
  .icon2 {
    margin-top: 10px;
    margin-left: auto;
  }

  .postContents {
    padding: 20px;
  }
`;
