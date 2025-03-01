import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export const Wrapper = styled.div`
  width: 1024px;
  padding: 50px 0 100px;
`;

export const Sub1 = styled.span`
  font-family: inherit;
  color: ${Colors.SUB1};
`;
export const Sub2 = styled.span`
  font-family: inherit;
  color: ${Colors.SUB2};
`;

export const FirstSection = styled.section`
  display: grid;
  grid-template-columns: 5fr 3fr;
  gap: 30px;
  height: 415px;
  margin-bottom: 50px;
`;
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .rowWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dDay {
    width: 60px;
    height: 25px;
    font-size: ${FontSize.SMALL};
    color: ${Colors.BW};
    background-color: #ed5a5a;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: ${FontSize.LARGE_T};
    font-family: ${FontFamily.BOLD};
    color: ${Colors.B100};
    margin: 12px 0 5px;
  }

  .percent {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.LARGE_T};
    color: ${Colors.SUB1};
    text-align: right;
  }

  .graph {
    width: 100%;
    height: 3px;
    background-color: ${Colors.B20};
    margin: 5px 0 12px;
    .participate {
      max-width: 100%;
      width: ${(props: { percent: number }) => `${props.percent}%`};
      height: 3px;
      background-color: ${Colors.SUB1};
    }
  }

  .goal {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    p:nth-of-type(1) {
      color: ${Colors.B80};
      font-size: ${FontSize.SMALL};
    }
    p:nth-of-type(2) {
      color: ${Colors.B100};
      font-size: ${FontSize.MEDIUM_T};
      font-family: ${FontFamily.BOLD};
    }
  }

  .user_button {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user {
      display: flex;
      align-items: center;
      .userImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
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
  }

  .subText {
    font-family: ${FontFamily.BOLD};
    font-size: ${FontSize.MEDIUM_C};
    color: ${Colors.B80};
    margin: auto 0;
    text-align: center;
  }
`;

export const SecondSection = styled.section`
  display: grid;
  grid-template-columns: 5fr 3fr;
  gap: 30px;
`;
export const Contents = styled.div`
  padding: 50px 0;
  img {
    width: 100%;
    margin-bottom: 35px;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${FontFamily.BOLD};
    color: ${Colors.B100};
  }
  p {
    line-height: 30px;
    font-size: ${FontSize.MEDIUM_C};
    color: ${Colors.B100};
    :last-of-type {
      margin-bottom: 0;
    }
  }
`;
export const ParticipationList = styled.div`
  position: relative;
  padding: 30px 0;
  > .sticky {
    position: sticky;
    top: 0;
    left: 0;
    padding: 20px 0;

    .title {
      color: ${Colors.B100};
      font-size: ${FontSize.LARGE_C};
      font-family: ${FontFamily.BOLD};
    }
    .totalCount {
      font-size: ${FontSize.MEDIUM_C};
      font-family: ${FontFamily.MEDIUM};
      color: ${Colors.B100};
      text-align: center;
      height: 50px;
      line-height: 50px;
      border: 1px solid ${Colors.B20};
      border-radius: 8px;
      margin: 20px 0 10px;
    }

    .list {
      padding: 12px 15px;
      border-bottom: 1px solid ${Colors.B20};
      :last-of-type {
        border-bottom: 0;
      }
      .userName {
        margin-right: 10px;
      }
    }
    .more {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: ${Colors.SUB1};
      font-size: ${FontSize.MEDIUM_C};
      border: 1px solid ${Colors.B20};
      border-radius: 8px;
      text-align: center;
      margin-top: 10px;
      cursor: pointer;
    }
  }
`;

export const ThirdSection = styled.section`
  padding-top: 35px;
  .commentTitle {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    > span {
      margin-right: 5px;
    }
  }
  > div:last-of-type {
    margin-bottom: 0;
  }
`;

export const MyPayment = styled.span`
  display: inline-block;
  height: 18px;
  line-height: 17px;
  font-size: 0.75rem;
  text-align: center;
  color: ${Colors.SUB2};
  border: 1px solid ${Colors.SUB2};
  border-radius: 10px;
  padding: 0 5px;
  margin-right: 10px;
`;
