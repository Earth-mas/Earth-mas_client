import { AxiosResponse } from 'axios';
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  LegacyRef,
  SetStateAction,
} from 'react';

export interface ICommentProps {
  el: {
    id: string;
    user: {
      url: string | undefined;
      name: string;
      id: string;
    };
    comments: string;
    updatedAt: string;
  };
}

export interface ICommentListUIProps {
  isPreviousData: boolean;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  clickPage: number;
  setClickPage: Dispatch<SetStateAction<number>>;
  refetch: any;
  getAllCommentData: FormEventHandler<HTMLFormElement> | undefined;
  handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  data: AxiosResponse<any, any> | undefined;
}

export interface ICommentUIProps {
  isEdit: boolean;
  el: {
    id: string;
    user: {
      url: string | undefined;
      name: string;
      id: string;
    };
    comments: string;
    updatedAt: string;
  };
  modal: boolean;
  onClickDelete: () => void;
  handleChange: (e: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  onClickEditComment: (e: {
    preventDefault: () => void;
  }) => Promise<false | undefined>;
  onClickEditInput: () => void;
  onClickOpenModal: () => void;
}
