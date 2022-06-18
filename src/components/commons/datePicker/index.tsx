import styled from '@emotion/styled';
import { SyntheticEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';
import { ko } from 'date-fns/esm/locale';

interface IDatePickerProps {
  defaultValue?: Date | null | undefined;
  onChangeDate: (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined,
  ) => void;
  name?: string;
  date: Date | null | undefined;
}

export default function DatePicker01(props: IDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const onChangeDate = (date: Date | null) => {
    setStartDate(date);
    console.log(startDate);
  };

  // 요일 반환
  // const getDayName = (date: Date | null) => {
  //   return date
  //     .toLocaleDateString('ko-KR', {
  //       weekday: 'long',
  //     })
  //     .substr(0, 1);
  // };

  // 날짜 비교시 년 월 일까지만 비교함
  // const createDate = date => {
  //   return new Date(
  //     new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
  //   );
  // };

  return (
    <Wrapper>
      <DatePicker
        locale={ko}
        minDate={new Date()}
        selected={props.date}
        dateFormat="yyyy/MM/dd"
        // selectsRange={true}
        startDate={props.date}
        // endDate={endDate}
        onChange={props.onChangeDate}
        // dayClassName={date =>
        //   getDayName(createDate(date)) === '토'
        //     ? 'saturday'
        //     : getDayName(createDate(date)) === '일'
        //     ? 'sunday'
        //     : undefined
        // }
        placeholderText="희망하는 목표 날짜를 선택해주세요"
        withPortal
        isClearable={true}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
    .react-datepicker {
      border-top-right-radius: 0;

      .saturday {
        color: rgb(0, 0, 255) !important;
      }

      &__input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;

        input {
          border-radius: 8px;
          border: 1px solid ${Colors.B60};
          padding: 0px 20px;
          width: 100%;
          height: 48px;
          font-family: ${FontFamily.MEDIUM};
          font-size: ${FontSize.MEDIUM_C};
          color: ${Colors.B80};

          &::placeholder {
            color: ${Colors.B60};
          }
          &:focus {
            border: 1px solid ${Colors.SUB1};
            border-radius: 8px;
            color: ${Colors.B100};
          }
        }
      }
    }
    .react-datepicker-popper {
      padding-top: 0px;
      .react-datepicker__triangle {
        ::before {
          border-bottom-color: ${Colors.B40};
          left: -12px;
        }
        ::after {
          left: -12px;
        }
      }
    }
  }
`;
