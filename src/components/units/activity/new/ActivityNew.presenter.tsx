import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import DatePicker02 from 'components/commons/datePicker/02';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01 from 'components/commons/upload/01/Upload01';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Controller } from 'react-hook-form';
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form/dist/types';
import { ActivityDetail } from '../detail/ActivityDetail.container';
import { FormValues } from './ActivityNew.container';

interface IActivityNewUIProps {
  newData?: ActivityDetail;
  handleChangeQuill: any;
  isSelected: string;
  control: Control<FieldValues, any>;
  urls: string[];
  contents: any;
  setUrls: Dispatch<SetStateAction<string[]>>;
  setIsSelected: Dispatch<React.SetStateAction<string>>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onClickSubmit: SubmitHandler<FormValues>;
  register: UseFormRegister<FormValues>;
}

export default function ActivityNewUI(props: IActivityNewUIProps) {
  return (
    <Wrap>
      <Title01 content="액티비티 등록" margin={35} size="C" />
      <form onSubmit={props.handleSubmit(props.onClickSubmit)}>
        <Input01
          id="title"
          type="text"
          placeholder="액티비티의 이름을 입력해주세요"
          margin={25}
          name="title"
          register={props.register('title')}
        />

        <ColumnWrap>
          <Dropdown01
            page={1}
            isSelected={
              props.newData?.activitycategory?.category ? props.isSelected : ''
            }
            setIsSelected={props.setIsSelected}
          />
          {/* <DatePicker01
            onChangeDate={props.onChangeDate}
            date={props.date}
            name={'dday'}
          /> */}
          {/* 달력 보여지는 위치 조정해주기 */}
          {/* 토, 일 색깔 적용하기 */}
          <Controller
            control={props.control}
            name="dday"
            // onChange={props.onChangeDate}
            render={({ field: { onChange, value } }) => (
              <DatePicker02
                selected={
                  props.newData?.dday
                    ? value || new Date(props.newData?.dday)
                    : value
                }
                onChange={date => onChange(date)}
              />
            )}
          />
        </ColumnWrap>

        <ColumnWrap>
          <Input01
            type="text"
            placeholder="활동 위치를 입력해주세요 (ex. 서울시 중구)" // nightmare로 위치 gps 적용해보기
            margin={25}
            name="location"
            register={props.register('location')}
          />

          <Input01
            register={props.register('maxpeople')}
            type="number"
            name="maxpeople"
            placeholder="모집 인원"
            pattern="[0-9]+"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$0');"
          />
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
          name="subdescription"
          register={props.register('subdescription')}
        />

        <Upload01 page="activity" urls={props.urls} setUrls={props.setUrls} />
        <Blank height={25} />
        <QuillEditor
          page={1}
          name="description"
          onChange={props.handleChangeQuill}
          value={props.contents || props.newData?.description || ''}
        />
        <Blank height={60} />
        <div className="buttonWrap">
          <ContainedButton01
            content="액티비티 등록"
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
