import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Container = styled.div`
  width: 100%;
  border: 1px solid ${Colors.B20};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  .imgContainer {
    height: 231.5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contents {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid ${Colors.B20};
    .textBox {
      width: 100%;
      margin-right: 15px;
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 1.25rem;
      }
      .title {
        -webkit-line-clamp: 2;
        height: calc(1.25rem * 2);
        margin-bottom: 10px;
        font-size: ${FontSize.MEDIUM_C};
      }
      .user {
        -webkit-line-clamp: 1;
        color: ${Colors.B80};
        font-size: ${FontSize.SMALL};
      }
    }
    .goal {
      min-width: 50px;
      width: 50px;
      height: 50px;
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.SEMIBOLD};
      color: ${Colors.SUB1};
      border: 1px solid ${Colors.SUB1};
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .price {
    font-family: ${FontFamily.SEMIBOLD};
    font-size: ${FontSize.MEDIUM_C};
    text-align: right;
    padding: 5px 12px;
  }
`;
