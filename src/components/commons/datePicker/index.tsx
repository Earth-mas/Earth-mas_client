import styled from '@emotion/styled';
import { SyntheticEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Colors } from 'styles/Colors';
import { FontFamily, FontSize } from 'styles/FontStyles';

interface IDatePickerProps {
  onChange: (
    date: Date | null,
    event: SyntheticEvent<any, Event> | undefined,
  ) => void;
  name: string;
  date: Date | null | undefined;
}

export default function DatePicker01(props: IDatePickerProps) {
  return (
    <Wrapper>
      <DatePicker
        selected={props.date}
        // minDate={new Date()}
        dateFormat="yyyy/MM/dd"
        // selectsRange={true}
        startDate={props.date}
        // endDate={endDate}
        onChange={props.onChange}
        placeholderText="희망하는 목표 날짜를 선택해주세요"
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
`;
