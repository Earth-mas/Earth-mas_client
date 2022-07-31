import styled from '@emotion/styled';
import { Scrollbars } from 'react-custom-scrollbars';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const ChatWrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  min-height: 715px;
  border: 1.5px solid ${Colors.MAIN};
  border-spacing: 1px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 330px 1fr;
  margin: 0 auto 50px;

  > section {
    position: relative;
    width: 100%;
    height: 100%;
    > .user {
      position: relative;
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
  .rightTop {
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1.5px solid ${Colors.MAIN};

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
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .userName {
        font-size: ${FontSize.MEDIUM_C};
        font-family: ${FontFamily.BOLD};
        color: ${Colors.B100};
        margin-left: 12px;
      }
    }
    .leaveRoom {
      font-size: ${FontSize.SMALL};
    }
  }

  .containerWrap {
    min-height: 647px;
    padding: 0 15px 15px;
  }
`;

export const Scrollbar = styled(Scrollbars)`
  height: 520px;
  max-height: 520px;
  overflow: hidden;
  padding-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  > div:first-of-type {
    height: 100%;
    position: static !important;
  }
`;

export const Message = styled.div`
  width: auto;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  :last-of-type {
    margin-bottom: 0;
  }

  &.recieved:nth-of-type(2) {
    .userImg {
      visibility: visible;
    }
    .userName {
      display: block !important;
    }
  }

  &.sended {
    justify-content: flex-end;

    .userImg {
      order: 2;
      display: none;
      margin-left: 10px;
    }

    .contentWrap {
      .userName {
        display: none;
        text-align: right;
      }
      > div {
        .content {
          background-color: ${Colors.SUB1};
          color: ${Colors.BW};
          text-align: right;
        }
      }
    }
  }

  &.recieved {
    justify-content: flex-start;

    .userImg {
      order: 1;
      margin-right: 10px;
    }

    .contentWrap {
      order: 2;
      > div {
        .time {
          order: 1;
          margin-left: 10px;
          margin-right: 0;
          text-align: left;
        }
        .content {
          background-color: ${Colors.B20};
          color: ${Colors.B100};
        }
      }
    }
  }

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
  .contentWrap {
    .userName {
      margin-bottom: 5px;
      font-size: ${FontSize.SMALL};
    }
    > div {
      display: flex;
      align-items: flex-end;

      .time {
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
        word-wrap: break-word;
        white-space: pre-line;
      }
    }
  }
`;

export const InputWrapper = styled.form`
  width: 100%;
  min-height: 100px;
  border: 1.5px solid ${Colors.MAIN};
  border-radius: 10px;
  padding: 10px;
  background-color: ${Colors.BW};

  > textarea {
    width: 100%;
    min-height: 50px;
    border: 0;
    ::placeholder {
      color: ${Colors.B60};
      font-size: ${FontSize.SMALL};
    }
  }
  .inputBottom {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .emoji {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -330px;
        background-color: white;
        border-color: #00a05a;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: white;
          width: 5px;
          &-thumb {
            background-color: #00a05a;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #00a05a;
        }
        .emoji-group:before {
          background-color: white;
        }
      }
    }
    > div:last-of-type {
      display: flex;
      align-items: center;

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
    background-color: rgba(0, 160, 91, 0.1);
  }
`;
export const List = styled.div`
  height: 65px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  :hover {
    background-color: rgba(0, 160, 91, 0.1);
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
    width: 100%;
    margin-left: 10px;
    overflow: hidden;

    .nameWrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      > div:first-of-type {
        font-size: ${FontSize.SMALL};
        font-family: ${FontFamily.BOLD};
        color: ${Colors.B100};
        display: flex;
        .userName {
          max-width: 145px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 5px;
        }
        .joinPeople {
          color: ${Colors.B60};
        }
      }
      .date {
        margin-left: 8px;
        font-size: 0.75rem;
        font-family: ${FontFamily.SEMIBOLD};
        color: ${Colors.B60};
      }
    }

    > p {
      display: block;
      width: 100%;
      font-family: ${FontFamily.MEDIUM};
      font-size: 0.8rem;
      height: 1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: ${Colors.B100};
    }
  }
`;

export const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: sticky;
  top: 14px;
  > div {
    font-weight: bold;
    font-size: 13px;
    height: 28px;
    line-height: 27px;
    padding: 0 16px;
    z-index: 2;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    position: relative;
    top: -0px;
    background: white;
    border: none;
    outline: none;
    cursor: default;
  }
`;
