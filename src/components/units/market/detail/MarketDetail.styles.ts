import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface IProps {
  nowTab?: string;
}

export const Wrap = styled.div`
  width: 1024px;
  padding: 50px 0px 100px 0px;
  main {
    // overview
    display: flex;
    grid-gap: 50px;
    margin-bottom: 60px;
  }
  .tab-nav {
    width: 100%;
    background-color: ${Colors.BW};
    border-bottom: 1px solid ${Colors.B40};
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      grid-gap: 150px;
      li {
        display: flex;
        text-align: center;
        span {
          width: 90px;
          height: 40px;
          line-height: 40px;
          font-family: ${FontFamily.MEDIUM};
          font-size: ${FontSize.MEDIUM_C};
          color: ${Colors.B100};
          &.active {
            font-family: ${FontFamily.BOLD};
            color: ${Colors.MAIN};
            border-bottom: 1px solid ${Colors.MAIN};
          }
          &:hover {
            font-family: ${FontFamily.BOLD};
            color: ${Colors.MAIN};
            border-bottom: 1px solid ${Colors.MAIN};
            cursor: pointer;
          }
        }
      }
    }
  }
`;
