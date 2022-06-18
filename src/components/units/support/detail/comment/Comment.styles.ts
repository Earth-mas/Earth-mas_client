import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;

  .userImg {
    min-width: 30px;
    max-width: 30px;
    width: 100%;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .userContent {
    .userName {
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      span:first-of-type {
        margin-right: 8px;
      }
    }

    p {
      margin-bottom: 8px;
    }

    .contentButton {
      display: flex;
      align-items: center;

      > * {
        font-size: ${FontSize.SMALL};
        color: ${Colors.B100};
        margin-right: 5px;
      }
      button {
        :hover {
          color: ${Colors.SUB1};
        }
      }
    }
  }
`;

export const Mine = styled.span`
  display: inline-block;
  width: 45px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 0.75rem;
  color: ${Colors.BW};
  background-color: ${Colors.SUB1};
  border-radius: 5px;
`;

export const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  .userImg {
    min-width: 30px;
    max-width: 30px;
    width: 100%;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .commentInput {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    button {
      position: absolute;
      right: 12px;
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.BOLD};
      color: ${Colors.B60};
      :hover {
        color: ${Colors.SUB1};
      }
    }
  }
`;
