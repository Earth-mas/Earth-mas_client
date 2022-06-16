import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 50px 0px 100px 0px;
`;

export const OverviewWrap = styled.div`
  width: 1024px;
  main {
    // overview
    display: flex;
    grid-gap: 50px;
    margin-bottom: 60px;
  }
`;

export const TabWrap = styled.div`
  width: 100%;
  position: sticky;
  top: -1px;
  z-index: 3; // 별점보다 상위
  .tab-nav {
    width: 100%;
    background-color: ${Colors.BW};
    border-bottom: 1px solid ${Colors.B40};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 180px;

    ul {
      width: 100%;
      display: flex;
      justify-content: center;

      li {
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;
        a {
          width: 90px;
          height: 40px;
          line-height: 40px;
          font-family: ${FontFamily.MEDIUM};
          font-size: ${FontSize.MEDIUM_C};
          color: ${Colors.B100};
          &:hover {
            font-family: ${FontFamily.BOLD};
            border-bottom: 1px solid ${Colors.B100};
          }
        }
      }
    }
  }
`;
