import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import DatePicker02 from 'components/commons/datePicker/02';
import { ISupportNewUIProps } from './SupportNew.types';
import { Controller } from 'react-hook-form';
import Upload01Copy from 'components/commons/upload/01/Upload01.copy';
import QuillEditorCopy from 'components/commons/text/reactQuill/ReactQuill.Copy';

export default function SupportNewUI(props: ISupportNewUIProps) {
  return (
    <Wrapper>
      <Title01
        content={props.isEdit ? '후원수정' : '후원등록'}
        margin={35}
        size="C"
      />
      <form
        onSubmit={props.handleSubmit(
          props.isEdit
            ? e => props.onClickEdit(e)
            : e => props.onClickSubmit(e),
        )}
      >
        <Input01
          register={props.register('title')}
          type="text"
          placeholder="제목을 입력해주세요"
          name="title"
          margin={25}
          defaultValue={props.fetchData?.title ? props.fetchData?.title : ''}
          maxLength={30}
        />

        <Input01
          register={props.register('wishamount')}
          type="number"
          placeholder="희망하는 목표 금액을 입력해주세요"
          name="wishamount"
          pattern={`/^[0-9]/g`}
          margin={25}
          defaultValue={
            props.fetchData?.wishamount
              ? Number(props.fetchData?.wishamount)
              : ''
          }
        />

        <Controller
          control={props.control}
          name="dday"
          render={({ field: { onChange, value } }) => (
            <DatePicker02
              selected={
                props.fetchData?.dday
                  ? value || new Date(props.fetchData?.dday)
                  : value
              }
              onChange={date => onChange(date)}
            />
          )}
        />
        <Upload01Copy
          page={'support'}
          urlString={props.urls}
          setUrlString={props.setUrls}
          fetchData={props.fetchData?.url.split(',')}
        />
        <Blank height={25} />
        {/* <QuillEditor
          name="description"
          page={0}
          onChange={props.handleChangeQuill}
          value={props.contents || props.fetchData?.description || ''}
        /> */}
        <QuillEditorCopy
          name="description"
          page={0}
          onChange={props.handleChangeQuill}
          value={props.contents || props.fetchData?.description || ''}
        />
        <Blank height={60} />

        <div className="submitButton">
          <ContainedButton01
            content={props.isEdit ? '후원수정' : '후원등록'}
            color="main"
            type="submit"
          />
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 30px 0px 100px;

  .submitButton {
    width: 250px;
    margin: 0 auto;
  }
`;
