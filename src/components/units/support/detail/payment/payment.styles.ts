import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  border: 1px solid ${Colors.B20};
  border-radius: 20px;
  margin: 50px 0 60px;
  padding: 50px 80px 60px;

  > p {
    text-align: center;
    &:nth-of-type(1) {
      font-size: ${FontSize.LARGE_C};
      color: ${Colors.B100};
      margin-bottom: 5px;
    }
    &:nth-of-type(2) {
      font-size: ${FontSize.MEDIUM_C};
      color: ${Colors.B100};
    }
  }

  .point {
    color: ${Colors.SUB1};
    font-size: inherit;
  }
`;
export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .circle {
    width: 20px;
    height: 20px;
    border: 2px solid ${Colors.MAIN};
    border-radius: 50%;
    margin-right: 10px;

    .check {
      width: 15px;
      height: 15px;

      &::after {
        content: '';
        display: block;
        position: relative;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border-width: 0 2px 2px 0;
        border-style: solid;
        border-color: ${Colors.MAIN};
        transform: rotate(45deg);
      }
    }
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .bottomLeft {
    width: 100%;
    margin-right: 40px;
    > p {
      &:nth-of-type(1) {
        font-size: ${FontSize.LARGE_T};
      }
      &:nth-of-type(2) {
        font-size: ${FontSize.SMALL};
        margin: 5px 0 30px;
      }
    }
    .grid {
      display: grid;
      grid-template-columns: 115px 1fr;
      > * {
        margin-bottom: 25px;
      }
      > p {
        font-size: 0.75rem;
        &:nth-of-type(5) {
          padding-top: 10px;
          font-family: ${FontFamily.BOLD};
        }
        &:last-of-type {
          font-family: ${FontFamily.BOLD};
          color: ${Colors.MAIN};
        }
      }
      .amountWrap {
        .amount {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          > span {
            font-size: ${FontSize.SMALL};
            display: block;
            margin-left: 10px;
          }
        }
        p {
          font-size: 0.75rem;
        }
      }
    }
  }

  .bottomRight {
    min-width: 350px;
    width: 350px;

    .explain {
      width: 100%;
      padding: 25px;
      border: 1px solid ${Colors.B20};
      border-radius: 5px;
      margin-bottom: 10px;

      p {
        font-size: 0.75rem;
        &:first-of-type {
          font-family: ${FontFamily.BOLD};
          margin-bottom: 5px;
        }
      }
    }

    .payment {
      width: 100%;
      border: 1px solid ${Colors.MAIN};
      border-radius: 5px;
      overflow: hidden;

      .contents {
        padding: 25px 30px 20px;

        > p {
          font-size: 0.75rem;
          color: ${Colors.B80};
        }

        .inputWrap {
          font-size: 0.75rem;
          color: ${Colors.B80};
          margin: 10px 0 40px;
          display: flex;
          align-items: center;
          label {
            display: flex;
            align-items: center;
            input {
              margin-right: 5px;
            }
          }
        }

        .rowGrid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            &:first-of-type {
              font-family: ${FontFamily.BOLD};
              font-size: ${FontSize.MEDIUM_C};
              color: ${Colors.B100};
            }
            &:last-of-type {
              font-family: ${FontFamily.BOLD};
              font-size: ${FontSize.LARGE_C};
              color: ${Colors.MAIN};
            }
          }
        }
      }
      button {
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        background-color: ${Colors.MAIN};
        font-family: ${FontFamily.BOLD};
        font-size: ${FontSize.MEDIUM_T};
        color: ${Colors.BW};
      }
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.B100};
  margin: 50px 0 30px;
`;
