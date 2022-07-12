import styled from '@emotion/styled';
import ContainedButton02 from 'components/commons/button/contained/ContainedButton02';
import Slide from 'components/commons/slide';
import { Link } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export default function HomePage() {
  return (
    <>
      <Slide
        slide="main"
        banner={[
          '/images/mainBanner/banner1.jpg',
          '/images/mainBanner/banner2.jpg',
        ]}
        autoplay={true}
      />
      <Wrapper>
        <Section>
          <div className="textBox">
            <p className="title">ACTIVITY</p>
            <p className="sub">
              세상을 바꾸기 위해 함께 실천해보세요.
              <br />
              지역사회를 기반으로 한<br />
              환경보호 실천 모임을 응원합니다.
            </p>
            <div className="button">
              <Link to="/activity">
                <ContainedButton02 color={'sub'} content={'더보기'} />
              </Link>
            </div>
          </div>
          <div className="imgBox">
            <img src="images/mainImg/main1.jpg" />
          </div>
        </Section>
        <Section>
          <div className="imgBox">
            <img src="images/mainImg/main2.jpg" />
          </div>
          <div className="textBox">
            <p className="title">SUPPORT</p>
            <p className="sub">
              세상을 위한 좋은 변화를 위하여
              <br />
              투명하게 다양한 사업을 지원합니다.
              <br />
              미래를 변화시키는 소중한 나눔의 시작입니다.
            </p>
            <div className="button">
              <Link to="/support">
                <ContainedButton02 color={'sub'} content={'더보기'} />
              </Link>
            </div>
          </div>
        </Section>
        <Section>
          <div className="textBox">
            <p className="title">MARKET</p>
            <p className="sub">
              우리가 일상에서 사용하는 제품에 더 나은 대안을 제시합니다.
              <br />
              건강한 자원의 순환과 지속 가능한 소비문화 회복을 지향합니다.
            </p>
            <div className="button">
              <Link to="/market">
                <ContainedButton02 color={'sub'} content={'더보기'} />
              </Link>
            </div>
          </div>
          <div className="imgBox">
            <img src="images/mainImg/main3.jpg" />
          </div>
        </Section>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 150px 0 180px;
`;

const Section = styled.section`
  width: 100%;
  display: flex;

  .textBox {
    width: 400px;
    margin: 0 62px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      width: 100%;
      color: ${Colors.MAIN};
      font-family: ${FontFamily.BOLD};
      font-size: 2.25rem;
      font-weight: 900;
    }
    .sub {
      width: 100%;
      word-break: break-all;
      margin: 30px 0 50px;
      font-size: ${FontSize.MEDIUM_T};
      line-height: 2rem;
    }
    .button {
      width: 180px;
      margin: 0 auto;
    }
  }
  .imgBox {
    min-width: 500px;
    width: 500px;
    height: 500px;
    img {
      width: 100%;
    }
  }

  &:nth-of-type(2) {
    margin: 200px 0;
  }
  &:nth-of-type(3) {
    display: block;
    .textBox {
      width: 100%;
      margin: 0 auto 80px;
      .title {
        font-size: 3rem;
      }
      .sub {
        margin: 20px 0 50px;
      }
    }
    .imgBox {
      width: 100%;
      height: auto;
    }
  }
`;
