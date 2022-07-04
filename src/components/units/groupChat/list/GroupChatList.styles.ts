import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

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

  .activity {
    display: flex;
    align-items: center;

    .activityImg {
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

  .activityInfo {
    margin-left: 10px;
    overflow: hidden;

    .name-date {
      display: flex;
      align-items: center;
      .activityTitle {
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
