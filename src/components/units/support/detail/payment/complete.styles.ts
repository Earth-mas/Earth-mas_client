import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize, FontFamily } from 'styles/FontStyles';

export const Wrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  border: 1px solid ${Colors.B20};
  border-radius: 20px;
  margin: 50px 0 60px;
  padding: 50px 80px 60px;

  > p {
    text-align: center;
    font-size: ${FontSize.LARGE_C};
    color: ${Colors.B100};
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
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.B100};
  margin: 50px 0 60px;
`;
export const Bottom = styled.div`
  .payment {
    margin: 25px 0 25px;
    display: flex;
    align-items: center;
    span {
      font-family: ${FontFamily.BOLD};
      &:nth-of-type(1) {
        font-size: 2.25rem;
        color: ${Colors.SUB1};
      }
      &:nth-of-type(2) {
        font-size: ${FontSize.LARGE_C};
        color: ${Colors.B100};
        margin-left: 5px;
      }
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 90px 1fr;
    margin-bottom: 60px;
    > p {
      font-size: ${FontSize.SMALL};
      :nth-of-type(1),
      :nth-of-type(2) {
        margin-bottom: 10px;
      }
      :nth-of-type(2) {
        font-family: ${FontFamily.BOLD};
      }
    }
  }

  a.buttonWrap {
    display: block;
    width: 250px;
    margin: 0 auto;
  }
`;
