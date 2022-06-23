import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const ItemImage = styled.section`
  width: 100%;
  display: flex;
  grid-gap: 5px;
  .cover-image-list {
    ul {
      display: flex;
      flex-direction: column;
      grid-gap: 5px;
      li {
        width: 60px;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        overflow: hidden;
        :hover {
          cursor: pointer;
          border: 2px solid ${Colors.MAIN};
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          :hover {
            transform: scale(1.1);
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }

  .cover-image {
    width: 100%;
    & div {
      width: 100%;
      height: 442px;
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100%;
        height: 442px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }
    }
  }
`;

export const ItemInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }

  .description {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.MEDIUM_C};
    color: ${Colors.B80};
    margin-bottom: 5px;
  }

  .review {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.SMALL};
    color: ${Colors.B80};
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    div {
      margin-right: 5px;
    }
  }

  .price {
    margin-bottom: 30px;
    span {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.LARGE_T};
      margin-right: 10px;
    }
    .price-discount-rate {
      color: ${Colors.SUB2};
    }
    .price-discount {
      color: black;
    }
    .price-origin {
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B40};
      text-decoration: line-through;
    }
  }
  .delivery {
    display: flex;
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.SMALL};

    .delivery-title {
      margin-right: 20px;
      color: ${Colors.B60};
    }
    .delivery-content {
      color: ${Colors.B80};
      li:first-of-type {
        margin-bottom: 5px;
      }
    }
  }
  hr {
    color: ${Colors.B80};
    margin: 30px 0px;
  }
  .pay {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
    span {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.LARGE_T};
    }
    .pay-content {
      color: ${Colors.MAIN};
    }
  }
  .buttons {
    display: flex;
    grid-gap: 20px;

    .button-wrap {
      display: flex;
      grid-gap: 20px;
      button {
        width: 55px;
        border: 1.5px solid ${Colors.MAIN};
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
