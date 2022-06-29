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
      margin-bottom: 50px;
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
    > p {
      &:nth-of-type(1) {
        font-size: ${FontSize.LARGE_T};
      }
      &:nth-of-type(2) {
        font-size: ${FontSize.SMALL};
        color: ${Colors.B80};
        margin: 10px 0 40px;
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
          font-family: ${FontFamily.BOLD};
        }
        &:nth-of-type(6) {
          font-family: ${FontFamily.BOLD};
          color: ${Colors.MAIN};
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
          /* align-items: center; */
          position: relative;
          > label {
            display: flex;
            align-items: center;
            input {
              margin-right: 5px;
            }
          }
          /* .checkbox input {
            display: none;
          }
          .checkbox-text {
            display: inline-block;
          }
          .checkbox-icon {
            display: flex;
            position: absolute;
            top: 1.5px;
            width: 12px;
            height: 12px;
            border: 1px solid ${Colors.B80};
            border-radius: 4px;
            position: relative;
            margin-right: 5px;
            cursor: pointer;
          }

          // 체크되었을 때 설정
          .checkbox input:checked + .checkbox-icon {
            border: 1px solid ${Colors.MAIN};
          }

          // 체크되었을 때 가상요소 after
          .checkbox input:checked + .checkbox-icon::after {
            content: '';
            display: block;
            position: relative;
            top: 1px;
            left: 3.5px;
            width: 2.5px;
            height: 5.5px;
            border-width: 0 1px 1px 0;
            border-style: solid;
            border-color: ${Colors.MAIN};
            transform: rotate(45deg);
          } */
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
