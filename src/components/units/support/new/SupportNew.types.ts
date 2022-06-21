import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { FormValues } from './SupportNew.container';
// import { FormValues } from './SupportNew.container';

export interface ISupportNewProps {
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string[];
      }
    | null
    | undefined;
}
export interface ISupportNewUIProps {
  onClickEdit: (data: FormValues) => Promise<void>;
  onClickSubmit: (data: FormValues) => Promise<void>;
  control: Control<FieldValues, any>;
  handleChangeQuill: (value: any) => void;
  contents: any;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string[];
      }
    | null
    | undefined;
  setUrls: Dispatch<SetStateAction<string[]>>;
  urls: string[];
}
