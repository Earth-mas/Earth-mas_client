import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';

export default function MarketNew() {
  return (
    <Wrap>
      <Title01 content="마켓 상품 등록" />

      <Input01
        id="title"
        type="text"
        placeholder="상품의 이름을 입력해주세요"
      />
      <Blank height={25} />

      <ColumnWrap>
        <Dropdown01 page="market" />
        <Input01
          id=""
          type="number"
          placeholder="판매 가능 수량을 입력해주세요"
        />
      </ColumnWrap>
      <Blank height={25} />

      <ColumnWrap>
        <Input01
          type="number"
          placeholder="희망하는 정상 가격을 입력해주세요"
        />
        <Input01
          type="number"
          placeholder="(선택) 희망하는 할인 가격을 입력해주세요"
        />
      </ColumnWrap>
      <Blank height={25} />
      <Input01
        type="text"
        placeholder="상품에 대한 짧은 설명과 대표 이미지를 입력해주세요"
      />
      <Blank height={25} />

      <Upload01 page="user" />
      <Blank height={25} />
      <QuillEditor page={0} />
      <Blank height={60} />
      <ContainedButton01 content="상품 등록" color="main" />
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px 0px;
`;

const ColumnWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  grid-gap: 25px;
`;
