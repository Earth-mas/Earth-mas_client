import styled from '@emotion/styled';
import Blank from 'components/commons/blank/Blank';
import ContainedButton01 from 'components/commons/button/contained/ContainedButton01';
import DatePicker02 from 'components/commons/datePicker/02';
import Dropdown01 from 'components/commons/dropdown/01/Dropdown01';
import Input01 from 'components/commons/inputs/Input01';
import QuillEditor from 'components/commons/text/reactQuill/ReactQuill';
import Title01 from 'components/commons/text/title/Title01';
import Upload01Copy from 'components/commons/upload/01/Upload01.copy';
import { Dispatch } from 'react';
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
  editData?: ActivityDetail | undefined;
  isSelected: string;
  isEdit?: boolean;
  control: Control<FieldValues, unknown>;
  contents?: string;
  urlString: string;
  handleChangeQuill: (value: string) => void;
  setUrlString: Dispatch<React.SetStateAction<string>>;
  setIsSelected: Dispatch<React.SetStateAction<string>>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onClickSubmit: SubmitHandler<FormValues>;
  onClickUpdate: SubmitHandler<FormValues>;
  register: UseFormRegister<FormValues>;
}

export default function ActivityNewUI(props: IActivityNewUIProps) {
  return (
    <Wrap>
      <Title01
        content={props.isEdit ? '액티비티 수정' : '액티비티 등록'}
        margin={35}
        size="C"
      />
      <form
        onSubmit={props.handleSubmit(
          props.isEdit ? props.onClickUpdate : props.onClickSubmit,
        )}
      >
        <Input01
          id="title"
          type="text"
          placeholder="액티비티의 이름을 입력해주세요"
          margin={25}
          name="title"
          register={props.register('title')}
          defaultValue={props.editData?.title ? props.editData?.title : ''}
        />

        <ColumnWrap>
          <Dropdown01
            page={1}
            isSelected={
              props.isEdit
                ? props.editData?.activitycategory?.category
                : props.isSelected
            }
            setIsSelected={props.setIsSelected}
          />
          {/* 토, 일 색깔 적용하기 */}
          <Controller
            control={props.control}
            name="dday"
            render={({ field: { onChange, value } }) => (
              <DatePicker02
                selected={
                  props.editData?.dday
                    ? value || new Date(props.editData?.dday)
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
            defaultValue={
              props.editData?.location ? props.editData.location : ''
            }
          />

          <Input01
            register={props.register('maxpeople')}
            type="number"
            name="maxpeople"
            placeholder="모집 인원"
            defaultValue={
              props.editData?.maxpeople ? props.editData.maxpeople : ''
            }
          />

          {/* nightmare로 + - 증감 인원 input창에 적용시켜보기 */}
        </ColumnWrap>

        <Input01
          type="text"
          placeholder="필요한 준비물을 입력해주세요(예: 멀쩡한 팔다리, 쓰레기 봉투, 집게, 장갑, 썬크림)"
          margin={25}
          name="subdescription"
          register={props.register('subdescription')}
          defaultValue={
            props.editData?.subdescription ? props.editData.subdescription : ''
          }
        />

        <Upload01Copy
          page={'activity'}
          urlString={props.urlString}
          setUrlString={props.setUrlString}
          fetchData={props.editData?.url ? props.editData?.url?.split(',') : []}
        />
        <Blank height={25} />
        <QuillEditor
          page={1}
          name="description"
          onChange={props.handleChangeQuill}
          value={props.contents || props.editData?.description || ''}
        />
        <Blank height={60} />
        <div className="buttonWrap">
          <ContainedButton01
            content={props.isEdit ? '액티비티 수정' : '액티비티 등록'}
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
