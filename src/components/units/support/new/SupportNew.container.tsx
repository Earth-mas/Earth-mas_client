import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import DatePicker01 from 'components/commons/datePicker';

export default function SupportNew() {
  const onClickSubmit = () => {
    alert('활동 등록');
  };

  return (
    <Wrapper>
      <Title01 content="후원하기 등록" margin={35} size="C" />
      <form>
        <Input01
          id="title"
          type="text"
          placeholder="제목을 입력해주세요"
          margin={25}
        />

        <Input01
          type="text"
          placeholder="희망하는 목표 금액을 입력해주세요"
          margin={25}
        />

        <DatePicker01 />

        <Upload01 page="market" />
        <Blank height={25} />
        <QuillEditor page={0} />
        <Blank height={60} />

        <div className="submitButton">
          <ContainedButton01
            content="등록하기"
            color="main"
            type="submit"
            onClick={onClickSubmit}
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
