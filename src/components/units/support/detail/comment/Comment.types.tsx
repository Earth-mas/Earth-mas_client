import { AxiosResponse } from 'axios';
import { ChangeEvent, FormEventHandler } from 'react';

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
  getAllCommentData: FormEventHandler<HTMLFormElement> | undefined;
  handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  data: AxiosResponse<any, any> | undefined;
}
