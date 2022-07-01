import axios from 'axios';
import store from 'storejs';
import { useForm } from 'react-hook-form';
import { FormReviewValues, IReviewNewProps } from './ReviewNew.types';
import ReviewNewUI from './ReviewNew.presenter';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { marketReviewRoute } from 'utils/APIRoutes';
import { useNavigate } from 'react-router-dom';

export interface IReviewMarketData {
  id: string;
  title: string;
  minidescription: string;
  url: string;
}
export default function ReviewNew(props: IReviewNewProps) {
  const accessToken = store.get('accessToken');
  const { register, handleSubmit } = useForm<FormReviewValues>();
  const [urlString, setUrlString] = useState('');
  const navigate = useNavigate();
  // const [marketData, setMarketData] = useState<IReviewMarketData>();

  const { data: reviewData } = useQuery(
    ['getReview'],
    async () => {
      const result = await axios.get(`${marketReviewRoute}/${props.reviewId}`);
      return result.data;
    },
    // {refetchOnWindowFocus: false,},
  );

  const onClickPostReview = async (data: FormReviewValues) => {
    const variables = {
      contents: data.contents,
      score: Number(data.score),
      url: urlString,
      market: props.marketData.id,
    };
    newReview(variables);
  };

  const { mutate: newReview } = useMutation(
    async (variables: FormReviewValues) => {
      return await axios.post(`${marketReviewRoute}`, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
    {
      onSuccess: () => {
        props.toggleEditModal();
        location.reload();
        // props.refetch();
        // navigate(`/market/${res.data.market}`);
      },
    },
  );

  const onClickPutReview = async (data: FormReviewValues) => {
    const updateVariables: FormReviewValues = {
      contents: reviewData.contents,
      score: reviewData.score,
      market: props.marketData.id,
      url: reviewData.url,
    };
    if (data.contents) updateVariables.contents = data.contents;
    if (data.score) updateVariables.score = Number(data.score);
    if (urlString) updateVariables.url = urlString;
    // console.log('리뷰 수정 :', updateVariables);
    updateReview(updateVariables);
  };

  const { mutate: updateReview } = useMutation(
    async (variables: FormReviewValues) => {
      return await axios.put(
        `${marketReviewRoute}/${reviewData.id} `,
        variables,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    },
    {
      onSuccess: () => {
        props.toggleEditModal();
        props.refetch();
      },
    },
  );

  return (
    <ReviewNewUI
      reviewData={reviewData}
      register={register}
      handleSubmit={handleSubmit}
      onClickPostReview={onClickPostReview}
      onClickPutReview={onClickPutReview}
      onClickCancel={props.onClickCancel}
      marketData={props.marketData}
      urlString={urlString}
      setUrlString={setUrlString}
    />
  );
}
