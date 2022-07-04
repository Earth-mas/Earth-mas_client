import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize, FontFamily } from 'styles/FontStyles';

export const InputWrapper = styled.form`
  width: 100%;
  height: 100px;
  border: 1.5px solid ${Colors.MAIN};
  border-radius: 10px;
  padding: 10px;

  textarea {
    width: 100%;
    height: calc(100% - 28px);
    border: 0;
    ::placeholder {
      color: ${Colors.B60};
      font-size: ${FontSize.SMALL};
    }
  }
  > div {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      font-size: 0.75rem;
      margin-right: 8px;
      span {
        color: ${Colors.SUB1};
      }
    }
    button {
      width: 55px;
      min-height: 25px;
      height: 25px;
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.SMALL};
      color: ${Colors.BW};
      background-color: ${Colors.B40};
      border-radius: 8px;

      :hover {
        background-color: ${Colors.SUB2};
      }
    }
  }
`;
