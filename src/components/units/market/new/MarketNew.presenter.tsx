import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import QuillEditorCopy from 'components/commons/text/reactQuill/ReactQuill.Copy';
import Title01 from 'components/commons/text/title/Title01';
import Upload01Copy from 'components/commons/upload/01/Upload01.copy';
import { IMarketNewUIProps } from './MarketNew.types';

export default function MarketNewUI(props: IMarketNewUIProps) {
  return (
    <Wrap>
      <Title01
        size="C"
        content={props.isEdit ? '상품 수정' : '상품등록'}
        margin={35}
      />
      <form
        onSubmit={props.handleSubmit(
          props.isEdit ? props.onClickUpdate : props.onClickSubmit,
        )}
      >
        <Input01
          register={props.register('title')}
          name="title"
          type="text"
          placeholder="(필수) 상품의 이름을 입력해주세요"
          margin={25}
          defaultValue={props.itemData?.title ? props.itemData?.title : ''}
        />

        <ColumnWrap>
          <Dropdown01
            page={0}
            isSelected={
              props.isEdit
                ? props.itemData?.marketcategory?.name
                : props.isSelected
            }
            setIsSelected={props.setIsSelected}
          />
          <Input01
            register={props.register('stock')}
            name="stock"
            id="stock"
            type="number"
            placeholder="(필수) 판매 가능 수량을 입력해주세요"
            margin={25}
            min={1}
            defaultValue={props.itemData?.stock ? props.itemData?.stock : ''}
          />
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            register={props.register('amount')}
            name="amount"
            type="number"
            placeholder="(필수) 희망하는 정상 가격을 입력해주세요"
            margin={25}
            min={1}
            defaultValue={props.itemData?.amount ? props.itemData?.amount : ''}
          />
          <Input01
            register={props.register('discount')}
            name="discount"
            type="number"
            placeholder="희망하는 할인 가격을 입력해주세요"
            min={1}
            defaultValue={
              props.itemData?.discount ? props.itemData?.discount : ''
            }
          />
        </ColumnWrap>

        <Input01
          register={props.register('minidescription')}
          name="minidescription"
          type="text"
          placeholder="(필수) 상품에 대한 짧은 설명과 대표 이미지를 입력해주세요"
          margin={25}
          defaultValue={
            props.itemData?.minidescription
              ? props.itemData?.minidescription
              : ''
          }
        />
        <Upload01Copy
          page="market"
          urlString={props.urlString}
          setUrlString={props.setUrlString}
          fetchData={props.itemData?.url ? props.itemData?.url.split(',') : []}
        />
        <Blank height={25} />
        {/* <QuillEditor
          page={0}
          onChange={props.onChangeQuill}
          value={props.contents || props.itemData?.description || ''}
        /> */}
        <QuillEditorCopy
          page={0}
          onChange={props.onChangeQuill}
          value={props.contents || props.itemData?.description || ''}
        />
        <Blank height={60} />
        <div className="button">
          <ContainedButton01
            content={props.isEdit ? '상품 수정' : '상품등록'}
            color="main"
            type="submit"
          />
        </div>
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px 0px;
  .button {
    display: flex;
    justify-content: center;
    button {
      width: 250px;
    }
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  grid-gap: 25px;
`;
