import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import DatePicker01 from 'components/commons/datePicker';
import { ISupportNewUIProps } from './SupportNew.types';

export default function SupportNewUI(props: ISupportNewUIProps) {
  return (
    <Wrapper>
      <Title01 content="후원등록" margin={35} size="C" />
      <form onSubmit={event => props.onClickSubmit(event)}>
        <Input01
          id="title"
          type="text"
          placeholder="제목을 입력해주세요"
          name="title"
          margin={25}
          onChange={e => props.handleChange(e)}
        />

        <Input01
          type="text"
          placeholder="희망하는 목표 금액을 입력해주세요"
          name="wishamount"
          margin={25}
          onChange={e => props.handleChange(e)}
        />

        <DatePicker01
          onChange={props.dateChange}
          name="dday"
          date={props.date}
        />

        <Upload01 page="support" urls={props.urls} setUrls={props.setUrls} />
        <Blank height={25} />
        <QuillEditor
          page={0}
          onChange={props.editorChange}
          name="description"
        />
        <Blank height={60} />

        <div className="submitButton">
          <ContainedButton01 content="등록하기" color="main" type="submit" />
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
