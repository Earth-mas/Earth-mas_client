import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import Title01 from 'components/commons/title/Title01';

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px 0px;
`;

export default function MarketNew() {
  return (
    <Wrap>
      <Title01 content={'마켓 상품 등록'} />
      <Blank height={30} />
      <Input01 type={'text'} content={'상품의 이름을 입력해주세요'} />
      <Blank height={25} />
      {/* <Dropdown01 page={'market'} /> */}
      <Dropdown01 />

      <ContainedButton01 content={'상품 등록'} color={'main'} />
    </Wrap>
  );
}
