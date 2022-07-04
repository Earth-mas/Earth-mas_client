import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Container = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${Colors.B20};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: ${(props: { leftDay: number }) =>
      props.leftDay > 1 ? '0.5' : '0'};
    display: ${(props: { leftDay: number }) =>
      props.leftDay > 1 ? 'block' : 'none'};
  }
  .imgContainer {
    height: 231.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2 linear;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2 linear;
    }
  }
  :hover {
    .imgContainer {
      img {
        transition: all 0.2s linear;
        transform: scale(1.2);
      }
    }
  }

  .leftDay {
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${Colors.BW};
    font-size: ${FontSize.LARGE_T};

    display: ${(props: { leftDay: number }) =>
      props.leftDay > 1 ? 'block' : 'none'};
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
