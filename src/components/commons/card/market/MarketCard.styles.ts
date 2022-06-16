import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 15px;

  .image-box {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      :hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: all 0.4s ease-in-out;
      }
    }
    .like {
      z-index: 2;
      position: absolute;
      bottom: 10px;
      right: 15px;
      :hover {
        cursor: pointer;
      }
    }
  }

  .description-box {
    padding: 0px 5px;
    display: flex;
    flex-direction: column;
    grid-gap: 3px;

    .title {
      font-family: ${FontFamily.MEDIUM};
      font-size: ${FontSize.MEDIUM_C};
      font-weight: 500;
      color: ${Colors.B100};
    }

    .price {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B100};
      .percent {
        color: ${Colors.SUB2};
      }
    }
  }
`;

export const SubDescription = styled.div`
  span {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.SMALL};
    color: ${Colors.B60};
  }
`;
