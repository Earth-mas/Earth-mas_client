import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

export const UserWrapper = styled.div`
  .title {
    display: flex;
    margin-bottom: 40px;

    h1 {
      font-size: ${FontSize.LARGE_C};
      margin-left: 10px;
    }
  }

  .userInfo {
    display: flex;
    width: 500px;
    margin: 0 auto;

    .avatarImage {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 137px;

      svg {
        margin-bottom: 20px;
      }

      span {
        position: absolute;
        bottom: 30px;
        right: 0;
        border-radius: 50px;
        width: 40px;
        height: 40px;
        border: 1px solid ${Colors.B80};
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
`;
