import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const ChatWrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  height: 715px;
  border: 1.5px solid ${Colors.MAIN};
  border-spacing: 1px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 330px 1fr;
  margin: 50px 0;

  > section {
    width: 100%;
    height: 100%;
    > .user {
      height: 65px;
      min-height: 65px;
      :first-of-type {
        border-bottom: 1.5px solid ${Colors.MAIN};
      }
    }
  }
`;
export const LeftContainer = styled.section`
  border-right: 1.5px solid ${Colors.MAIN};
  overflow: hidden;

  > .user {
    display: flex;
    align-items: center;
    padding-left: 12px;

    .userImg {
      width: 45px;
      height: 45px;
      border: 1.5px solid ${Colors.SUB1};
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 90%;
        height: 90%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .userName {
      font-size: ${FontSize.MEDIUM_T};
      font-family: ${FontFamily.BOLD};
      color: ${Colors.B100};
      margin-left: 12px;
    }
  }
`;
export const RightContainer = styled.section`
  overflow: hidden;
  > .user {
    display: flex;
    align-items: center;
    padding: 15px;

    .userImg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .userName {
      font-size: ${FontSize.SMALL};
      font-family: ${FontFamily.MEDIUM};
      color: ${Colors.B100};
      margin-left: 12px;
    }
  }
`;

export const ContainerWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  padding: 0 15px 15px;
  /* overflow: hidden; */

  > div {
    height: 520px;
    max-height: 520px;
    overflow-y: auto;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: end; */
    padding: 10px 5px 0;
    margin-bottom: 10px;

    > .messageWrap {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      :last-of-type {
        margin-bottom: 0;
      }
      &.sended {
        justify-content: flex-end;
        .message {
          .content {
            background-color: ${Colors.SUB1};
            color: ${Colors.BW};
          }
        }
        :first-of-type {
          .message {
            .content {
              border-top-right-radius: 0;
            }
          }
        }
      }
      &.recieved {
        justify-content: flex-start;
        .message {
          > .time {
            order: 1;
            margin-left: 10px;
            margin-right: 0;
            text-align: left;
          }
          border-top-left-radius: 0;

          .content {
            background-color: ${Colors.B20};
            color: ${Colors.B100};
          }
        }
        &:first-of-type {
          .message {
            .content {
              border-top-left-radius: 0;
            }
          }
        }
      }
    }

    .message {
      width: auto;
      display: flex;
      align-items: flex-end;
      /* overflow: hidden; */
      > .time {
        min-width: 75px;
        font-size: 0.75rem;
        color: ${Colors.B80};
        margin-bottom: 5px;
        margin-right: 10px;
        text-align: right;
      }
      .content {
        width: auto;
        padding: 10px 12px;
        font-size: ${FontSize.SMALL};
        line-height: ${FontSize.MEDIUM_T};
        border-radius: 17px;
        color: #d1d1d1;
        word-wrap: break-word;
        white-space: pre-line;
        /* overflow: hidden; */
      }
    }
  }
`;

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

export const ListContainer = styled.div`
  height: calc(100% - 65px);
  overflow-y: auto;
  :hover {
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: ${Colors.MAIN};
        width: 0.3rem;
        border-radius: 1rem;
      }
    }
  }

  > div {
    border-bottom: 1px solid ${Colors.B20};
    :last-of-type {
      border: 0;
    }
  }
  .selected {
    background-color: aliceblue;
    /* background-color: rgba(0, 160, 91, 0.1); */
  }
`;
export const List = styled.div`
  height: 65px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  :hover {
    background-color: aliceblue;
    /* background-color: rgba(0, 160, 91, 0.1); */
  }

  .user {
    display: flex;
    align-items: center;

    .userImg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .userInfo {
    margin-left: 10px;
    overflow: hidden;

    .name-date {
      display: flex;
      align-items: center;
      .userName {
        font-size: ${FontSize.SMALL};
        font-family: ${FontFamily.BOLD};
        color: ${Colors.B100};
      }
      .date {
        margin-left: 8px;
        font-size: 0.75rem;
        font-family: ${FontFamily.SEMIBOLD};
        color: ${Colors.B60};
      }
    }

    > p {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.MEDIUM};
      color: ${Colors.B100};
    }
  }
`;
