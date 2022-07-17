import { Dispatch, SetStateAction } from 'react';
import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface ISupportNewProps {
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string;
      }
    | null
    | undefined;
}

export interface FormValues {
  title?: string;
  wishamount?: number;
  description?: string;
  dday?: Date | null;
  url?: string;
}

export interface ISupportNewUIProps {
  onClickEdit: (data: FormValues) => Promise<void>;
  onClickSubmit: (data: FormValues) => Promise<false | void>;
  control: Control<FieldValues, any>;
  handleChangeQuill: (value: string) => void;
  contents: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  isEdit: boolean;
  fetchData:
    | {
        title: string;
        wishamount: number;
        description: string;
        dday: Date | null;
        url: string;
      }
    | null
    | undefined;
  setUrls: Dispatch<SetStateAction<string>>;
  urls: string;
}
