import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const SlideWrapper = styled.div`
  width: 100%;
  height: 400px;
`;
export const Wrapper = styled.div`
  position: relative;
  width: 1024px;
  padding: 50px 0 100px;
  .topWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;

    .totalCount {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B100};
      span {
        font-family: ${FontFamily.BOLD};
        color: ${Colors.MAIN};
      }
    }
  }
`;
export const CardWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 30px;
`;
