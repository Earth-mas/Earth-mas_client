import styled from '@emotion/styled';
import Title01 from 'components/commons/text/title/Title01';

export default function MarketDetail() {
  return (
    <Wrap>
      <nav>
        <Title01 content="마켓 > 주방" size="C" margin={35} />
      </nav>
      <main>
        <section>이미지</section>
        <section>설명</section>
      </main>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 50px 0px 100px 0px;
`;
