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
        banner1="/images/mainBanner/banner1.jpg"
        banner2="/images/mainBanner/banner2.jpg"
        banner3="/images/mainBanner/banner3.jpg"
      />
      <Wrapper>
        <Section>
          <div className="textBox">
            <p className="title">titletitletitletitle</p>
            <p className="sub">
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
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
            <p className="title">titletitletitletitle</p>
            <p className="sub">
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
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
            <p className="title">titletitletitletitle</p>
            <p className="sub">
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
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
      font-weight: 700;
    }
    .sub {
      width: 100%;
      word-break: break-all;
      margin: 15px 0 50px;
      font-size: ${FontSize.MEDIUM_T};
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
    margin: 150px 0;
  }
  &:nth-of-type(3) {
    display: block;
    .textBox {
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
