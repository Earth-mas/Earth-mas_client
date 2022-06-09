import styled from '@emotion/styled';
import { Colors } from '../../../styles/Colors';
import { FontSize } from '../../../styles/FontStyles';

export const ModalBackGround = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px) brightness(40%);
`;

export const LoginWrapper = styled.main`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 500px;
  height: 645px;
  border: 1px solid ${Colors.B40};
  overflow: hidden;
  box-shadow: ${Colors.B80} 0 6px 16px;
  background-color: white;
  border-radius: 20px;
  padding: 55px 80px;
  margin: 0 auto;

  h1 {
    font-size: ${FontSize.LARGE_T};
    color: ${Colors.MAIN};
    padding-bottom: 40px;
  }

  .xButton {
    position: absolute;
    font-size: ${FontSize.LARGE_C};
    top: 20px;
    right: 30px;
    margin-bottom: 15px;
    border: none;
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

  label {
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 25px;
    font-size: ${FontSize.SMALL};
    color: ${Colors.B100};
    .checkBox {
      width: 15px;
      margin: 0 10px 0 0;
    }
  }

  .loginButton {
    color: ${Colors.BW};
    background-color: ${Colors.MAIN};
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: ${FontSize.MEDIUM_C};
  }

  .socialLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${FontSize.SMALL};

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

  .signUp {
    display: flex;
    justify-content: center;
    font-size: ${FontSize.SMALL};

    strong {
      color: ${Colors.MAIN};
    }
  }
`;
