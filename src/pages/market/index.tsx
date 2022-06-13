import styled from '@emotion/styled';
import Slide from 'components/commons/slide';
import MarketList from 'components/units/market/list/MarketList.container';
import banner1 from '../../assets/images/market/banner/banner1.jpeg';
import banner2 from '../../assets/images/market/banner/banner2.jpeg';
import banner3 from '../../assets/images/market/banner/banner3.jpeg';

export default function MarketPage() {
  return (
    <Wrap>
      <Slide
        slide="main"
        banner1={banner1}
        banner2={banner2}
        banner3={banner3}
      />
      <main className="main-contents">
        <MarketList />
      </main>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main-contents {
    max-width: 1024px;
    width: 100%;
    padding: 50px 0px 100px 0px;
  }
`;
