import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';

export default function ListCard() {
  return (
    <Wrapper>
      <div className="imgContainer">
        <img src="/images/activity/card/card02.jpg" />
      </div>
      <div className="addressContainer">서울시중구</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${Colors.B20};
  border-radius: 5px;
  .imgContainer {
    width: 235px;
    height: 235px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .addressContainer {
    width: 90px;
    height: 33px;
    border-radius: 10px;
    background-color: rgba(0, 171, 51, 0.5);
    text-align: center;
    /* line-height: 34px; */
    display: table-cell;
    vertical-align: middle;
  }
`;
