import styled from '@emotion/styled';
import { LogoWhite } from 'assets/svgs';
import Line from 'components/commons/line';
import { Link } from 'react-router-dom';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export default function Footer() {
  return (
    <FooterWrapper>
      <ContentsWrapper>
        <div className="firstRow">
          <LogoWhite className="logoImg" />
          <ul className="footerMenu">
            <li>
              <Link to="/marker">마켓</Link>
            </li>
            <li>
              <Link to="/activity">모임활동</Link>
            </li>
            <li>
              <Link to="/support">후원</Link>
            </li>
            <li>
              <Link to="/">자주 묻는 질문</Link>
            </li>
          </ul>
        </div>
        <Line />
        <div className="secondRow">
          <ul className="rowEmail">
            <li>
              <span>고객문의</span>aaaa@gmail.com
            </li>
            <li>
              <span>후원문의</span>aaaa@gmail.com
            </li>
          </ul>
          <p>서울특별시 구로구 디지털로 300 12층 패스트파이브</p>
          <p>Copyright ⓒ 2022 EARTH-MAS All rights reserved</p>
        </div>
      </ContentsWrapper>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: #49574f;
`;

const ContentsWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 80px;
  margin: 0 auto;
  color: white;

  .firstRow {
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .logoImg {
      width: auto;
      height: 100%;
    }

    .footerMenu {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        font-family: ${FontFamily.MEDIUM};
        font-size: ${FontSize.MEDIUM_C};
      }
    }
  }

  .secondRow {
    color: ${Colors.B40};
    margin-top: 45px;
    .rowEmail {
      display: flex;
      justify-content: left;
      li {
        display: flex;
        align-items: center;

        &:first-of-type {
          margin-right: 15px;
        }
        span {
          display: block;
          font-family: ${FontFamily.BOLD};
          font-size: ${FontSize.SMALL};
          margin-right: 5px;
        }
      }
    }
    p:nth-of-type(1) {
      margin: 20px 0 35px;
    }
  }
`;
