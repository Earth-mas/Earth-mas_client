import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker01 from 'components/commons/datePicker';
// import { MinusIcon, PlusIcon } from 'assets/svgs';
// import { useState } from 'react';

export default function ActivityNew() {
  // const [count, setCount] = useState(0);

  const onClickSubmit = () => {
    alert('활동 등록');
  };

  // const onClickMinus = () => {
  //   setCount(count - 1);
  // };
  // const onClickPlus = () => {
  //   setCount(count + 1);
  // };

  return (
    <Wrap>
      <Title01 content="액티비티 등록" margin={35} size="C" />
      <form>
        <Input01
          id="title"
          type="text"
          placeholder="액티비티의 이름을 입력해주세요"
          margin={25}
        />

        <ColumnWrap>
          <Dropdown01 page={1} />
          <DatePicker01 />
          {/* 달력 보여지는 위치 조정해주기 */}
          {/* 토, 일 색깔 적용하기 */}
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            type="text"
            placeholder="활동 위치를 입력해주세요 (ex. 서울시 중구)" // nightmare로 위치 gps 적용해보기
            margin={25}
          />

          <Input01 type="number" placeholder="모집 인원" />
          {/* <div className="PlusMinus">
              <MinusIcon style={{ cursor: 'pointer' }} onClick={onClickMinus} />
              {count}
              <PlusIcon style={{ cursor: 'pointer' }} onClick={onClickPlus} />
            </div> */}
          {/* </div> */}
          {/* nightmare로 + - 증감 인원 input창에 적용시켜보기 */}
        </ColumnWrap>

        <Input01
          type="text"
          placeholder="필요한 준비물을 입력해주세요(예: 멀쩡한 팔다리, 쓰레기 봉투, 집게, 장갑, 썬크림)"
          margin={25}
        />

        <Upload01 page="market" />
        <Blank height={25} />
        <QuillEditor page={1} />
        <Blank height={60} />
        <div className="buttonWrap">
          <ContainedButton01
            content="액티비티 등록"
            color="main"
            type="submit"
            onClick={onClickSubmit}
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

  .buttonWrap {
    width: 20%;
    display: flex;
    justify-content: center;
    margin: auto;
  }
`;

const ColumnWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;
`;
