import styled from '@emotion/styled';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ActivityNew() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const onChangeDate = (date: Date | null) => {
    setStartDate(date);
  };

  const onClickSubmit = () => {
    alert('활동 등록');
  };

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
          <SDatePicker
            selected={startDate}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
            // selectsRange={true}
            startDate={startDate}
            // endDate={endDate}
            onChange={onChangeDate}
            placeholderText="희망하는 날짜를 선택해주세요"
            isClearable={true}
          />
          {/* <Input01
            id=""
            type="date"
            placeholder="희망하는 날짜를 선택해주세요" // datepicker 라이브러리 활용
            margin={25}
          /> */}
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            type="text"
            placeholder="활동 위치를 입력해주세요 (ex. 서울시 중구)" // nightmare로 위치 gps 적용해보기
            margin={25}
          />
          <Input01 type="text" placeholder="모집 인원 1명" />
        </ColumnWrap>

        <Input01
          type="text"
          placeholder="필요한 준비물을 입력해주세요(예: 멀쩡한 팔다리, 쓰레기 봉투, 집게, 장갑, 썬크림)"
          margin={25}
        />

        <Upload01 page="market" />
        <Blank height={25} />
        <QuillEditor page={0} />
        <Blank height={60} />
        <ContainedButton01
          content="액티비티 등록"
          color="main"
          type="submit"
          onClick={onClickSubmit}
        />
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

const SDatePicker = styled(DatePicker)`
  width: 100%;
  height: 48px;
  border: 1px solid ${Colors.B60};
  border-radius: 8px;
  padding: 14px 20px;
  color: ${Colors.B80};
  font-family: ${FontFamily.MEDIUM};
  font-size: ${FontSize.MEDIUM_C};

  ::placeholder {
    color: ${Colors.B60};
  }
  :focus {
    outline: none;
    border: 1px solid ${Colors.SUB1};
    color: ${Colors.B100};
  }
`;
