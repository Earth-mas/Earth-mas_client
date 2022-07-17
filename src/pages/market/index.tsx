import styled from '@emotion/styled';
import { NewButton } from 'components/commons/button/new/NewButton';
import Slide from 'components/commons/slide';
import MarketList from 'components/units/market/list/MarketList.container';
import banner2 from '../../assets/images/market/banner/banner2.jpeg';
import banner3 from '../../assets/images/market/banner/banner3.jpeg';
import banner4 from '../../assets/svgs/banner/market_1.svg';

export default function MarketPage() {
  return (
    <Wrap>
      <Slide
        slide="main"
        banner={[banner4, banner2, banner3]}
        autoplay={true}
      />
      <main className="main-contents">
        <NewButton />
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
  > div {
    height: 400px;
  }
  .main-contents {
    max-width: 1024px;
    width: 100%;
    padding: 50px 0px 100px 0px;
  }
`;
