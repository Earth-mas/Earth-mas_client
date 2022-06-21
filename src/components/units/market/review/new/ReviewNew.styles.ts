import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 25px;
  display: flex;
  flex-direction: column;
  .info-wrap {
    display: flex;
    align-items: center;
    grid-gap: 15px;
    margin-bottom: 30px;

    .image {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      .title {
        font-size: ${FontSize.MEDIUM_C};
        font-family: ${FontFamily.BOLD};
      }
      .minidescription {
        font-size: ${FontSize.SMALL};
      }
    }
  }

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    .input-wrap {
      display: flex;
      flex-direction: column;
      margin-bottom: 35px;
      h1 {
        font-family: ${FontFamily.BOLD};
        font-size: ${FontSize.MEDIUM_T};
        color: ${Colors.B100};
        margin-bottom: 10px;
      }
      p {
        font-family: ${FontFamily.MEDIUM};
        font-size: ${FontSize.SMALL};
        color: ${Colors.B80};
      }
      textarea {
        width: 100%;
        height: 80px;
        border: 1px solid ${Colors.B60};
        border-radius: 8px;
        padding: 14px 20px;
        color: ${Colors.B80};
        font-family: ${FontFamily.MEDIUM};
        font-size: ${FontSize.SMALL};
        resize: none;
        line-height: 20px;
        ::placeholder {
          color: ${Colors.B60};
        }
        :focus {
          border: 1px solid ${Colors.SUB1};
          color: ${Colors.B100};
        }
      }
    }
    .buttons {
      width: 100%;
      display: flex;
      grid-gap: 20px;
    }
  }
`;
