import { ChangeEvent, FormEventHandler } from 'react';

export interface ICommentListProps {
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
  getAllgetAllCommentData: FormEventHandler<HTMLFormElement> | undefined;
  handleChange: (arg0: ChangeEvent<HTMLInputElement>) => void;
  data: any;
}
