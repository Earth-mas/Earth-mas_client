import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  width: 100%;
`;

export const Score = styled.div`
  width: 100%;
  /* height: 130px; */
  display: flex;
  /* grid-gap: 5px; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${Colors.B40};
  padding: 30px 0px;
  .title {
    font-family: ${FontFamily.MEDIUM};
    font-size: ${FontSize.MEDIUM_C};
    color: black;
    margin: 10px 0px;
  }
  .score {
    font-family: ${FontFamily.SEMIBOLD};
    font-size: ${FontSize.MEDIUM_T};
    color: black;
    margin-bottom: 10px;
  }
  .button {
    width: 100px;
  }
`;
