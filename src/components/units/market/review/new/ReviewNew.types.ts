import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form/dist/types';
import { IMarketReviewDetail } from '../detail/ReviewDetail.types';
export interface IReviewNewProps {
  onClickCancel: () => void;
  reviewData?: IMarketReviewDetail;
  marketData?: {
    id: string;
    title: string;
    minidescription: string;
    url?: string;
  };
}

export interface FormReviewValues {
  contents?: string;
  score?: number;
  market?: string;
  url?: string;
}

export interface IReviewNewUIProps {
  register: any;
  handleSubmit: UseFormHandleSubmit<FormReviewValues>;
  onClickPostReview: SubmitHandler<FormReviewValues>;
  onClickPutReview: SubmitHandler<FormReviewValues>;
  onClickCancel: () => void;
  // urls: string[];
  // setUrls: Dispatch<SetStateAction<string[]>>;

  urlString: string;
  setUrlString: Dispatch<React.SetStateAction<string>>;

  marketData?: {
    id: string;
    title: string;
    minidescription: string;
    url?: string;
  };

  reviewData?: IMarketReviewDetail;
}
