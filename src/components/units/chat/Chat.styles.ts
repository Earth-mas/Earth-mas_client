import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  height: 715px;
  border: 1.5px solid ${Colors.MAIN};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
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

  .listContainer {
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
  }
`;
export const RightContainer = styled.section`
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
