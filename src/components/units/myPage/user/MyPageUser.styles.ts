import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

export const UserWrapper = styled.div`
  min-width: 720px;
  color: ${Colors.B100};

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 60px;

    h1 {
      font-size: ${FontSize.LARGE_C};
      font-weight: 400;
      margin-left: 10px;
    }
  }

  h2 {
    font-size: ${FontSize.MEDIUM_T};
    font-weight: 400;
    color: ${Colors.MAIN};
  }

  .sectionTitle {
    margin-left: 110px;
  }

  .userInfo {
    display: flex;
    width: 500px;
    margin: 0 auto;
    padding-bottom: 45px;
  }

  .userInfoLeft {
    margin-right: 70px;
    img {
      width: 137px;
      height: 137px;
      border-radius: 70%;
      overflow: hidden;
      border: 1px solid ${Colors.B20};
      object-fit: cover;
    }

    .avatarImage {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 137px;

      input {
        display: none;
      }

      button {
        margin-top: 20px;
        font-size: ${FontSize.MEDIUM_C};
      }

      span {
        position: absolute;
        bottom: 30px;
        right: 0;
        border-radius: 50px;
        width: 40px;
        height: 40px;
        border: 1px solid ${Colors.B20};
        background-color: ${Colors.BW};

        .cameraIcon {
          position: absolute;
          top: 6px;
          right: 6.5px;
          width: 25px;
        }
      }
    }
  }

  .userInfoRight {
    display: flex;
    flex-direction: column;
    justify-content: center;

    mark {
      font-size: ${FontSize.LARGE_T};
      /* color: ${Colors.MAIN}; */
      background-color: transparent;
      margin-right: 5px;
    }

    .userName {
      font-size: ${FontSize.MEDIUM_C};
      color: ${Colors.B80};
      margin-bottom: 10px;
    }

    .userEmail {
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B80};
    }
  }

  .userAddress {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;

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

    .row {
      display: flex;
      height: 58px;
      margin-top: 25px;
    }
  }

  .userPassword {
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;

    h2 {
      font-size: ${FontSize.MEDIUM_T};
      font-weight: 400;
      color: ${Colors.MAIN};
      padding-bottom: 25px;
    }
  }

  .deleteUser {
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;

    h2 {
      font-size: ${FontSize.MEDIUM_T};
      font-weight: 400;
      color: ${Colors.MAIN};
      padding-bottom: 25px;
    }
  }
`;
