import styled from '@emotion/styled';
import { Colors } from '../../../styles/Colors';
import { FontSize } from '../../../styles/FontStyles';

export const SignUpWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
  padding-bottom: 100px;

  h1 {
    margin-top: 70px;
    font-size: ${FontSize.LARGE_T};
    color: ${Colors.MAIN};
    padding-bottom: 40px;
  }

  .socialSignUp {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${FontSize.MEDIUM_C};

    p {
      padding-bottom: 15px;
    }

    section {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 130px;
      padding: 25px 0 40px;
    }
  }

  input {
    margin-bottom: 15px;
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

    &:hover {
      background-color: rgba(1, 92, 52, 0.05);
    }
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
