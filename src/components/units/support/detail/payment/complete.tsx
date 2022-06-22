import styled from '@emotion/styled';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export default function SupportComplete() {
  return (
    <Wrapper>
      <Top>
        <div className="circle">
          <i className="check"></i>
        </div>
        결제완료
      </Top>
      <p>"감사합니다. 기부금을 소중하게 사용하겠습니다."</p>
      <Line />
      <Bottom>
        <p>기부정보 확인</p>
        <div className="payment">
          <span>1,000</span>
          <span>원 기부되었습니다.</span>
        </div>
        <div className="grid">
          <p>모금함명</p>
          <p>MBN 소나무 투병 중인 지적 장애인 부부 이야기</p>
          <p>단체명</p>
          <p>사회복지공동모금회</p>
        </div>
        <div className="buttonWrap">
          <ContainedButton01 content="확인" color="main" />
        </div>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
  border: 1px solid ${Colors.B20};
  border-radius: 20px;
  margin: 50px 0 60px;
  padding: 50px 80px 60px;

  > p {
    text-align: center;
    font-size: ${FontSize.LARGE_C};
    color: ${Colors.B100};
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .circle {
    width: 20px;
    height: 20px;
    border: 2px solid ${Colors.MAIN};
    border-radius: 50%;
    margin-right: 10px;

    .check {
      width: 15px;
      height: 15px;

      &::after {
        content: '';
        display: block;
        position: relative;
        top: 2px;
        left: 5px;
        width: 4px;
        height: 8px;
        border-width: 0 2px 2px 0;
        border-style: solid;
        border-color: ${Colors.MAIN};
        transform: rotate(45deg);
      }
    }
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Colors.B100};
  margin: 50px 0 60px;
`;
const Bottom = styled.div`
  .payment {
    margin: 25px 0 25px;
    display: flex;
    align-items: center;
    span {
      font-family: ${FontFamily.BOLD};
      &:nth-of-type(1) {
        font-size: 2.25rem;
        color: ${Colors.SUB1};
      }
      &:nth-of-type(2) {
        font-size: ${FontSize.LARGE_C};
        color: ${Colors.B100};
        margin-left: 5px;
      }
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 90px 1fr;
    margin-bottom: 60px;
    > p {
      font-size: ${FontSize.SMALL};
      :nth-of-type(1),
      :nth-of-type(2) {
        margin-bottom: 10px;
      }
      :nth-of-type(2) {
        font-family: ${FontFamily.BOLD};
      }
    }
  }

  .buttonWrap {
    width: 250px;
    margin: 0 auto;
  }
`;
