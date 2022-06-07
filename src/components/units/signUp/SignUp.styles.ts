import styled from '@emotion/styled';
import { Colors } from '../../../styles/Colors';
import { FontSize } from '../../../styles/FontStyles';

export const SignUpWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;

  h1 {
    font-size: ${FontSize.LARGE_T};
    color: ${Colors.MAIN};
    padding-bottom: 40px;
  }

  input {
    width: 100%;
    border: 1px solid ${Colors.B40};
    height: 50px;
    font-size: ${FontSize.SMALL};
    padding: 0 20px;
    margin-bottom: 15px;
    border-radius: 8px;
  }

  .defaultButton {
    width: 100%;
    color: ${Colors.MAIN};
    background-color: ${Colors.BW};
    width: 100%;
    height: 50px;
    border: 1px Solid ${Colors.MAIN};
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: ${FontSize.MEDIUM_C};
  }

  .signUpButton {
    color: ${Colors.BW};
    background-color: ${Colors.MAIN};
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: ${FontSize.MEDIUM_C};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 500px;
`;
