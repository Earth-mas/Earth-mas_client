import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

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
