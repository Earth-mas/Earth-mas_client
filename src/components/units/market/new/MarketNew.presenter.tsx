import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { FormValues } from './MarketNew.container';

interface IMarketNewUIProps {
  register: any;
  handleSubmit: any;
  onClickSubmit: SubmitHandler<FormValues>;
}

export default function MarketNewUI(props: IMarketNewUIProps) {
  return (
    <Wrap>
      <Title01 size="C" content="마켓 상품 등록" margin={35} />

      <form onSubmit={props.handleSubmit(props.onClickSubmit)}>
        <input {...props.register('name')} />
        <input {...props.register('title')} />
        <Input01
          register={props.register('title')}
          // register={{ ...register('title') }}
          // register={props.register('title')}
          type="text"
          placeholder="상품의 이름을 입력해주세요"
          margin={25}
        />

        <ColumnWrap>
          <Dropdown01 page={0} />

          <Input01
            // register={{ ...register('stock') }}
            // register={register('stock')}
            id="stock"
            type="number"
            placeholder="판매 가능 수량을 입력해주세요"
            margin={25}
          />
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            // register={{ ...register('amount') }}
            // {...register('amount')}
            type="number"
            placeholder="희망하는 정상 가격을 입력해주세요"
            margin={25}
          />
          <Input01
            // register={{ ...register('discount') }}
            // {...register('discount')}
            type="number"
            placeholder="(선택) 희망하는 할인 가격을 입력해주세요"
          />
        </ColumnWrap>

        <Input01
          // register={{ ...register('minidescription') }}
          // {...register('minidescription')}
          type="text"
          placeholder="상품에 대한 짧은 설명과 대표 이미지를 입력해주세요"
          margin={25}
        />

        {/* <Upload01 page="market" urls={urls} setUrls={setUrls} /> */}
        <Blank height={25} />
        <QuillEditor page={0} />
        <Blank height={60} />
        <ContainedButton01 content="상품 등록" color="main" type="submit" />
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px 0px;
`;

const ColumnWrap = styled.div`
  display: flex;
  grid-gap: 25px;
`;
