import styled from '@emotion/styled/';
import { Logo } from 'assets/svgs';
import UpdateAddress from 'components/units/myPage/user/profile/updateAddress';
import { Colors } from 'styles/Colors';
import { FontSize } from 'styles/FontStyles';

export default function MoreInfo() {
  return (
    <Wrapper>
      <div className="title">
        <Logo />를 이용하기 위해
      </div>
      <div>
        <mark>주소 정보</mark>가 필요합니다.
      </div>
      <article>
        earth-mas에 오신 것을 환영합니다!
        <br />
        소셜 계정에 등록된 주소 정보가 없습니다.
        <br />
        주소를 입력해주세요.
        <br />
        감사합니다.
      </article>
      <section className="addressInputs">
        <UpdateAddress addressnumber="" address1="" address2="" id="" />
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 100px 200px;
  div {
    display: flex;
    align-items: center;
    font-size: ${FontSize.MEDIUM_T};
    svg {
      width: 170px;
      height: 50px;
      margin-right: 5px;
    }
    mark {
      font-weight: 600;
      color: ${Colors.SUB1};
      background-color: transparent;
    }
  }
  article {
    margin-top: 50px;
  }
  .addressInputs {
    margin-top: 50px;
    width: 500px;
  }
`;
