import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form/dist/types';
export interface IReviewNewProps {
  onClickCancel: () => void;
  reviewData?: {
    contents: string;
    createAt: string;
    deletdAt: any;
    id: string;
    score: number;
    updatedAt: string;
  };
}

export interface FormReviewValues {
  contents?: string;
  score?: number;
  market?: string;
}

export interface IReviewNewUIProps {
  register: any;
  handleSubmit: UseFormHandleSubmit<FormReviewValues>;
  onClickPostReview: SubmitHandler<FormReviewValues>;
  onClickPutReview: SubmitHandler<FormReviewValues>;
  onClickCancel: () => void;

  MARKET_DATA: {
    id: string;
    title: string;
    minidescription: string;
    url?: string;
  };

  REVIEW_DATA?: {
    contents: string;
    id: string;
    score: number;
  };
}
