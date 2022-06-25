import axios from 'axios';
import store from 'storejs';
import { useForm } from 'react-hook-form';
import { FormReviewValues, IReviewNewProps } from './ReviewNew.types';
import ReviewNewUI from './ReviewNew.presenter';
import { useEffect, useState } from 'react';

export default function ReviewNew(props: IReviewNewProps) {
  const accessToken = store.get('accessToken');
  const { register, handleSubmit } = useForm<FormReviewValues>();
  const [urlString, setUrlString] = useState('');

  useEffect(() => {
    console.log(urlString);
  }, [urlString]);

  const onClickPostReview = async (data: FormReviewValues) => {
    const variables = {
      contents: data.contents,
      score: Number(data.score),
      url: urlString,
      market: props.marketData?.id,
    };
    // console.log('리뷰 등록 :', variables);
    await axios
      .post(`https://earth-mas.shop/server/marketreview/ `, variables, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log('응답', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onClickPutReview = async (data: FormReviewValues) => {
    const updateVariables: FormReviewValues = {
      contents: props.reviewData?.contents,
      score: props.reviewData?.score,
      market: props.marketData?.id,
      url: props.reviewData?.url,
    };
    if (data.contents) updateVariables.contents = data.contents;
    if (data.score) updateVariables.score = data.score;
    if (urlString) updateVariables.url = urlString;

    console.log('리뷰 수정 :', updateVariables);
    await axios
      .put(
        `https://earth-mas.shop/server/marketreview/${props.reviewData?.id} `,
        updateVariables,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('응답', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ReviewNewUI
      register={register}
      handleSubmit={handleSubmit}
      onClickPostReview={onClickPostReview}
      onClickPutReview={onClickPutReview}
      onClickCancel={props.onClickCancel}
      marketData={props.marketData}
      reviewData={props.reviewData}
      urlString={urlString}
      setUrlString={setUrlString}
    />
  );
}
