import styled from '@emotion/styled';
import SupportCard from 'components/commons/card/support/SupportCard';
import Dropdown02 from 'components/commons/dropdown/02/Dropdown02';
import Pagination from 'components/commons/pagination';
import Slide from 'components/commons/slide';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

export default function SupportListUI() {
  const banner1 = '/images/supportBanner/supportBanner1.jpg';
  const banner2 = undefined;
  const banner3 = undefined;

  return (
    <>
      <Slide
        slide="main"
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
      />
      <Wrapper>
        <div className="topWrapper">
          <p className="totalCount">
            전체 기부 <span>58</span>개
          </p>
          <Dropdown02 page={1} />
        </div>
        <CardWrapper>
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
        </CardWrapper>
        <Pagination />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 1024px;
  padding: 50px 0 100px;
  .topWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;

    .totalCount {
      font-family: ${FontFamily.BOLD};
      font-size: ${FontSize.MEDIUM_T};
      color: ${Colors.B100};
      span {
        font-family: ${FontFamily.BOLD};
        color: ${Colors.MAIN};
      }
    }
  }
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 30px;
`;
